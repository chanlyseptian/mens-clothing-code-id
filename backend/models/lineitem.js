'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LineItem.init({
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    ProductStockId: DataTypes.INTEGER,
    ShoppingCartId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LineItem',
  });
  return LineItem;
};