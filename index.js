require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require('fs');

const database=require("./config/db");
const product=require("./models/product");

const productRoutes=require("./routes/productRoute");


//this line is also important even also for dynamic websites. It will load css files and images
const staticPath = path.join(__dirname, "./public");

//add viewsPath
const viewsPath = path.join(__dirname, "./views");

const partialPath = path.join(__dirname, "./partials");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.urlencoded({ extended: false }));


//this line is also important even also for dynamic websites. It will load css files and images
app.use(express.static(staticPath));

//to register partials
hbs.registerPartials(partialPath);


app.use("",productRoutes);


app.listen(8000,()=>{
    console.log("Server is running at port number 8000");
})