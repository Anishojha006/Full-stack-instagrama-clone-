const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required:true
    },
    followee: {
        type: String,
        required:true
    }
}, {
    timestamps: true  // this te;ll when this document was created in the database and last time when it wsa updated
});

const followModel = mongoose.model("Follows",followSchema);

module.exports  = followModel;