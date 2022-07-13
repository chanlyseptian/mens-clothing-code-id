const { Product, User, ProductImage } = require("../models");
const axios = require("axios").default;

const { URL } = require("url");

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
  static async getPageProduct(req, res) {
    try {
      const page = +req.query.page || 1;
      const perPage = req.query.limit || 1;
      const skip = (page - 1) * 10;
      let pageProduct = await Product.findAll({
        include: [User, ProductImage],
        limit: 1,
        offset: (page - 1) * 5,
        where,
      });
      res.status(200).json(pageProduct);
    } catch (error) {
      // console.log(error);
      res.status(500).json(error);
    }
  }
  // static async getPageProduct(req, res) {
  //   try {
  //     const page = +req.query.page || 1;
  //     const perPage = +req.query.perPage || 1;
  //     let getPageJobs = await axios({
  //       method: "GET",
  //       url: "http://localhost:3000/products" + page,
  //     });
  //     const url = URL + "?" + page;

  //     console.log(url);
  //     res.status(200).json(getPageJobs.data);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

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
      const {
        name,
        desc,
        price,
        stock,
        expire,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
        unit,
      } = req.body;
      let result = await Product.update(
        {
          name,
          desc,
          price,
          stock,
          stock,
          expire,
          weight,
          category,
          condition,
          totalSold,
          rating,
          views,
          unit,
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
}

module.exports = ProductController;
