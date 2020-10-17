const ProductController = require("../Controllers/ProductController");
const authController=require("../Controllers/authController");
const cartController=require("../Controllers/cartController");
const express = require("express");

const router = express.Router();

router.route("/getallproducts").get(ProductController.getAllProducts);
router.route("/cart").post(cartController.addToCart);

module.exports = router;
