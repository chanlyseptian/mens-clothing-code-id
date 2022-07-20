const bannerImagesRoute = require("express").Router();
const BannerImagesController = require("../controllers/BannerImagesController");

bannerImagesRoute.get("/", BannerImagesController.getBanners);
bannerImagesRoute.get("/active", BannerImagesController.getActiveBanners);
bannerImagesRoute.post("/add", BannerImagesController.addBanner);
bannerImagesRoute.put("/edit/:id", BannerImagesController.editBanner);

module.exports = bannerImagesRoute;
