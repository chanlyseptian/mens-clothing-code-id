const { Product, User, ProductImage } = require("../models");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["id", "asc"]],
      });
      res.status(200).json(products);
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
        stock,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
        UserId: id,
      });

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
        include: [ProductImage],
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

  static async getProductByCategory(req, res, next){
    const category = req.params.category;
    // const page = req.params.page
    // const limit = req.params.limit

    // const startIndex = (page - 1) * limit
    // const endIndex = page * limit

    try{
      let product = await getProductByCategory.findAll({
        where: { category },
      });
      // let result = await product.slice(startIndex, endIndex)
      res.status(201).json(product)
    } catch (err){
      next(err)
    }
  }

  static async sortProductsNameAtoZ(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["name", "asc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsNameZtoA(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["name", "desc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsPriceAsc(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["price", "asc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsPriceDesc(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["price", "desc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsLatest(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["id", "desc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsRatingDesc(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["rating", "desc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async sortProductsRatingAsc(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
        order: [["rating", "asc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
