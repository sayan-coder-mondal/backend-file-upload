const mongoose=require("mongoose");

mongoose.connect(process.env.database_name)
.then(()=>console.log("Database connected..."))
.catch((err)=>console.log(err));