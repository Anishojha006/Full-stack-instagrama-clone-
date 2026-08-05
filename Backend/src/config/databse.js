const mongoose = require("mongoose");

async function  connecToDataBase(){
   await mongoose.connect(process.env.MONGO_URI)
   console.log("connected to mongoDB database");
}

module.exports = connecToDataBase;