const { uploadProductForm, uploadProduct, allProducts } = require("../controllers/productController");
const express=require("express");
const router = express.Router();
const { upload } = require("../utils/upload");


router.get("/",uploadProductForm);
router.post("/product",upload.single('image'),uploadProduct);
router.get("/products",allProducts);

module.exports=router;