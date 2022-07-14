const productRoute = require("express").Router();
const ProductController = require("../controllers/ProductController");
const authentication = require("../middlewares/auth");
const upload = require("../middlewares/multer");

productRoute.get("/", ProductController.getAllProducts);
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
productRoute.get("/nameAsc", ProductController.sortProductsNameAtoZ);
productRoute.get("/nameDesc", ProductController.sortProductsNameZtoA);
productRoute.get("/priceAsc", ProductController.sortProductsPriceAsc);
productRoute.get("/priceDesc", ProductController.sortProductsPriceDesc);
productRoute.get("/latest", ProductController.sortProductsLatest);
productRoute.get("/ratingAsc", ProductController.sortProductsRatingAsc);
productRoute.get("/RatingDesc", ProductController.sortProductsRatingDesc);
productRoute.get("/:id", ProductController.getProductById);
productRoute.put("/views/:id", ProductController.addViews);
// productRoute.get("/cat/:category", ProductController.getProductByCategory);


module.exports = productRoute;
