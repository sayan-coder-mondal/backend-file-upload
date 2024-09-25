const product=require("../models/product");
const {cloudinary}=require("../utils/upload");


exports.uploadProductForm=async(req,res)=>{
    try {
        res.render("productUpload");
        // res.send("Home")
    } catch (error) {
        res.send(error);
    }
}


exports.allProducts=async(req,res)=>{
    try {
        // res.send("ALL PRODUCTS");
        const allProducts=await product.find();
        res.render("products",{allProducts});
    } catch (error) {
        res.send(error)
    }
}


exports.uploadProduct=async (req,res)=>{
    try {
        // console.log(req.body);
        // console.log(req.files);
        // const file=req.files.image;
        console.log(req.file.path);

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        // Create a new product entry in the database
        const uploadedProduct = new product({
            productName: req.body.productName,
            price: req.body.price,
            image: result.secure_url
        });

        // Save the product to the database
        await uploadedProduct.save();

        // Send a response after saving the product
        // res.send("Success");
        res.redirect("/products");
    } catch (error) {
        res.send(error);
    }
}