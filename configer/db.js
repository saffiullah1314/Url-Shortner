const mongoose = require("mongoose");


const connectDb = async (url) =>{
    try{
       await mongoose.connect(url);
        console.log("mongoose connected")
    }
    catch(err){
        console.error("error found" , err);
    }
}

module.exports = connectDb;