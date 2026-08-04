const mongoose = require("mongoose");

const friendsRequestSchema  = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },
},{
    timestamps:true
});

/** Prevents duplicate request */
const friendRequestModel = mongoose.model("FriendRequest",friendsRequestSchema);

module.exports = friendRequestModel;
