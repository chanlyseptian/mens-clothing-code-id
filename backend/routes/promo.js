const promoRoutes = require("express").Router();

const PromoController = require("../controllers/PromoController");
const authentication = require("../middlewares/auth");
promoRoutes.get("/", authentication, PromoController.getPromo);
promoRoutes.post("/", authentication, PromoController.createPromo);
promoRoutes.put("/:id", authentication, PromoController.updatePromo);
promoRoutes.delete("/:id", authentication, PromoController.deletePromo);
module.exports = promoRoutes;