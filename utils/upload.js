const multer = require("multer");
const cloudinary=require("cloudinary").v2;


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


// Export the configurations
module.exports = {
    cloudinary,
    upload
};