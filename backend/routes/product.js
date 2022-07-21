const productRoute = require("express").Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/auth");
const upload = require("../middlewares/multer");

productRoute.get("/", ProductController.getAllProducts);
productRoute.get("/search", ProductController.getProductsBySearch);
productRoute.get("/categories/:category", ProductController.getByCategories);
productRoute.post(
  "/",
  authentication,
  upload.array("filename"),
  ProductController.create
); //just for admin
productRoute.put(
  "/:id",
  authentication,
  upload.array("filename"),
  ProductController.update
); //just for admin
productRoute.put(
  "/imageSize/:id",
  authentication,
  upload.single('imageSize'),
  ProductController.updateImageSize
); //just for admin
productRoute.post(
  "/bulkProduct",
  authentication,
  upload.single("filename"),
  ProductController.createBulkProduct
); //just for admin
productRoute.get("/:id", ProductController.getProductById);
productRoute.put("/views/:id", ProductController.addViews);

module.exports = productRoute;
