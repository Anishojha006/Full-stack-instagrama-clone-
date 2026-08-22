const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required:true,
        unique:true

    },
    followee: {
        type: String,
        required:true,
    },
    Status:{
        type:String,
        default:"pending",
        enum:{ 
           values: ["pending","accepted","rejected"],
           message:"status can only be pending , accepted or rejected"
        }
          }
}, {
    timestamps: true  // this te;ll when this document was created in the database and last time when it wsa updated
});


const followModel = mongoose.model("Follows",followSchema);

module.exports  = followModel;