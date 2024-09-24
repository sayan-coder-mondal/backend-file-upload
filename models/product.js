const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const product=new mongoose.model("product",productSchema);

module.exports=product;