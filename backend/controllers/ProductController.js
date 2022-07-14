const { Product, User, ProductImage, ProductStock } = require("../models");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";
      let limit = 4

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
      });

      let totalProduct = await Product.count();

      let result = {
        data: products,
        page: page,
        limit: limit,
        totalPage: Math.ceil(totalProduct/limit)
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
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";
      let limit = 4

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          category: category
        }
      });

      let result = {
        data: products,
        page: page,
        limit: limit,
        totalData: products.length
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
        console.log(stocks)
        if(sizes){
          sizes.forEach(async (size, index) => {
				    await ProductStock.create({
              ProductId: result.id,
              size: size || 0,
              stock: stocks[index] || 0
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
