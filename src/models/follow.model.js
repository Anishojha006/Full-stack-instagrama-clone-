const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follow is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    }
}, {
    timestamps: true  // this te;ll when this document was created in the database and last time when it wsa updated
});

const followModel = mongoose.model("Follows",followSchema);

module.exports  = followModel;