const { promo } = require("../models");

class promoController {
  static async getPromo(req, res) {
    try {
      let getPromo = await promo.findAll();

      res.status(200).json(getPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPromo(req, res) {
    try {
      const { name_promo, potongan_harga, tgl_mulai, tgl_akhir } = req.body;

      let createPromo = await promo.create({
        name_promo,
        potongan_harga,
        tgl_mulai,
        tgl_akhir,
      });
      res.status(201).json(createPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updatePromo(req, res) {
    try {
      const id = req.params.id;
      const { name_promo, potongan_harga, tgl_mulai, tgl_akhir } = req.body;

      let updatePromo = await promo.update(
        {
          name_promo,
          potongan_harga,
          tgl_mulai,
          tgl_akhir,
        },

        {
          where: { id },
        }
      );
      updatePromo[0] === 1
        ? res.status(201).json({
            message: "promo updated successfully",
          })
        : res.status(403).json({
            message: "not succes",
          });
    } catch (error) {
      //   console.log(error);
      res.status(500).json(error);
    }
  }

  static async deletePromo(req, res) {
    try {
      const id = req.params.id;

      let deletePromo = await promo.destroy({
        where: { id },
      });
      deletePromo[0] === 1
        ? res.status(201).json({
            message: "promo deleted successfully",
          })
        : res.status(404).json({
            message: "promo not found",
          });
    } catch (error) {
      //   console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = promoController;
