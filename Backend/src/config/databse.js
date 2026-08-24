const mongoose = require("mongoose");
const followModel = require("../models/follow.model.js");

async function  connecToDataBase(){
   await mongoose.connect(process.env.MONGO_URI)
   try {
      await followModel.collection.dropIndex("follower_1_folowee_1");
      console.log("removed obsolete follow index");
   } catch (error) {
      if (error.codeName !== "IndexNotFound") {
         throw error;
      }
   }
   await followModel.createIndexes();
   console.log("connected to mongoDB database");
}

module.exports = connecToDataBase;