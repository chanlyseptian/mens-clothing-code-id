'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User); //type admin
      Product.hasMany(models.ProductImage);
      Product.hasMany(models.ProductStock);
      Product.belongsToMany(models.Order, { through: models.LineItem });
      Product.belongsToMany(models.ShoppingCart, { through: models.LineItem });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    expire: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    category: DataTypes.STRING,
    condition: DataTypes.STRING,
    totalSold: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageSize: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};