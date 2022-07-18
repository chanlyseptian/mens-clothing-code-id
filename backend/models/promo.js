"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      promo.belongsTo(models.Product);
    }
  }
  promo.init(
    {
      potongan_harga: DataTypes.INTEGER,
      tgl_mulai: DataTypes.DATE,
      tgl_akhir: DataTypes.DATE,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "promo",
    }
  );
  return promo;
};
