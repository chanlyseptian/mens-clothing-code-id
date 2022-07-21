const promoRoutes = require("express").Router();

const promoController = require("../controllers/promoController");
const authentication = require("../middlewares/auth");
promoRoutes.get("/", authentication, promoController.getPromo);
promoRoutes.post("/", authentication, promoController.createPromo);
promoRoutes.put("/:id", authentication, promoController.updatePromo);
module.exports = promoRoutes;
