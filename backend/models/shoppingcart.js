'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingCart.belongsToMany(models.Product, { through: models.LineItem })
      ShoppingCart.belongsToMany(models.ProductStock, { through: models.LineItem })
      ShoppingCart.belongsToMany(models.Order, { through: models.LineItem })
      ShoppingCart.belongsTo(models.User)
    }
  }
  ShoppingCart.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};