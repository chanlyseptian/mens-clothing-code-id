const { Product, User, ProductImage, ProductStock } = require("../models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";
      const limit = req.query.limit || 5;

      let products = await Product.findAndCountAll({
        include: [User, ProductImage, ProductStock],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
      });

      let totalData = products.count
      let result = {
        data: products.rows,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit)
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getProductsBySearch(req, res, next) {
    try {   
      const page = +req.query.page || 1;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";
      const limit = req.query.limit || 5;
      const search = req.query.search
      const filter = req.body.filter || []
      let products
     
      products = await Product.findAndCountAll({
        include: [User, ProductImage, ProductStock],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          [Op.or]: [
            {
              name : {
                [Op.like]: `%${search}%`
              }
          },{
            desc : {
              [Op.like]: `%${search}%`
            }
          },{
            category : {
              [Op.like]: `%${search}%`
            }
          }]
        },
      })

      // ----- Filter products by categories -----
      if(filter.length !== 0){
        console.log(search)
        console.log("ada filter")
        products.rows  = products.rows.filter( prd => filter.includes(prd.category))
      }

      // ----- Output Data for FE -----
      let totalData = products.count
      let result = {
        data: products.rows,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit)
      }
      
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getByCategories(req, res, next) {
    try {
      const category = req.params.category || "tops";
      const page = +req.query.page || 1;
      const limit = req.query.limit || 5;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";

      let products = await Product.findAndCountAll({
        include: [User, ProductImage, ProductStock],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          category: category
        }
      });

      let totalData = products.count
      let result = {
        data: products.rows,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit)
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async create(req, res, next) {
    try {
      const id = req.userData.id;
      const imagenames = req.files;
      const {
        name,
        desc,
        price,
        stock,
        sizes,
        colors,
        stocks,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;

      const result = await Product.create({
        name,
        desc,
        price,
        stock: stock || 0,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
        UserId: id,
      });

      console.log(result.id)
      if(result.id){
		console.log(sizes)
    console.log(colors)
		console.log(stocks)
		if(sizes){
			sizes.forEach(async (size, index) => {
				await ProductStock.create({
					ProductId: result.id,
					size: size || 0,
					stock: stocks[index] || 0
				})
			})
		} else if(colors){
      colors.forEach(async (color, index) => {
        await ProductStock.create({
          ProductId: result.id,
          color: color || 0,
          stock: stocks[index] || 0
        })
      })
    } else if (sizes&&colors){
      sizes.forEach(async (size) => {
        colors.forEach(async (color, index) => {
          await ProductStock.create({
            ProductId: result.id,
            size: size || 0,
            color: color || 0,
            stock: stocks[index] || 0
          })
        })
			})
      
    }
      }

      imagenames.forEach(async (imagename, index) => {
        const isPrimary = index === 0 ? true : false;
        await ProductImage.create({
          filename: imagename.filename,
          ProductId: result.id,
          fileType: imagename.mimetype,
          primary: isPrimary,
        });
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userData.id;
      const imagenames = req.files;

      const {
        name,
        desc,
        price,
        sizes,
        colors,
        stocks,
        stock,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;
      let result = await Product.update(
        {
          name,
          desc,
          price,
          stock,
          weight,
          category,
          condition,
          totalSold,
          rating,
          views,
        },
        {
          where: { id: id, UserId: userId },
        }
      );

      if(result){
        console.log("result true")
        sizes.forEach(async (size, index) => {
          await ProductStock.update({
            stock: stocks[index]
          },{
            where: {
              ProductId: id,
			        size: sizes[index],
            }
          })
        })
        colors.forEach(async (color, index) => {
          await ProductStock.create({
            ProductId: result.id,
            color: color || 0,
            stock: stocks[index] || 0
          })
        })
      }

      imagenames.forEach(async (imagename, index) => {
        const isPrimary = index === 0 ? true : false;
        await ProductImage.update(
          {
            filename: imagename.filename,
            fileType: imagename.mimetype,
            primary: isPrimary,
          },
          {
            where: {
              ProductId: id,
            },
          }
        );
      });
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async getProductById(req, res, next) {
    const id = req.params.id;
    try {
      let result = await Product.findByPk(id, {
        include: [ProductImage, ProductStock],
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addViews(req, res, next) {
    const id = req.params.id;
    try {
      let product = await Product.findByPk(id);
      let result = await Product.update(
        {
          views: product.views + 1,
        },
        {
          where: { id },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
