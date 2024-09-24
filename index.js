require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const multer = require("multer");
const fs = require('fs');
const fileUpload=require("express-fileupload");

const cloudinary=require("cloudinary").v2;

const database=require("./config/db");
const product=require("./models/product");



//this line is also important even also for dynamic websites. It will load css files and images
const staticPath = path.join(__dirname, "./public");

//add viewsPath
const viewsPath = path.join(__dirname, "./views");

const partialPath = path.join(__dirname, "./partials");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.urlencoded({ extended: false }));
// app.use(fileUpload({
//     useTempFiles:true
// }));

//this line is also important even also for dynamic websites. It will load css files and images
app.use(express.static(staticPath));

//to register partials
hbs.registerPartials(partialPath);



const storage=multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

console.log(storage)


const upload=multer({storage:storage})

console.log(upload)

// Configuration
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

app.get("/",async(req,res)=>{
    try {
        res.render("productUpload");
        // res.send("Home")
    } catch (error) {
        res.send(error);
    }
})

app.post("/product",upload.single('image'),async (req,res)=>{
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


        // await cloudinary.uploader.upload(req.file.path,(err,result)=>{
        //     console.log(result);
        //     const uploadedProduct=new product({
        //         productName:req.body.productName,
        //         price:req.body.price,
        //         image:result.secure_url
        //     });
        //     uploadedProduct.save();
        //     // res.send("Success")
        //     res.redirect("/products");
        // })
    } catch (error) {
        res.send(error);
    }
});


app.get("/products",async(req,res)=>{
    try {
        // res.send("DKNNDKJ");
        const allProducts=await product.find();
        res.render("products",{allProducts});
    } catch (error) {
        res.send(error)
    }
})



app.listen(8000,()=>{
    console.log("Server is running at port number 8000");
})