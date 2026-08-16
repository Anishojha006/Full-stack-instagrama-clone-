const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exist"],
        required: [true, "Username is req1uired"]
    },

    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true ,"password is required"],
        select:false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/workingwithimages/defaultUserImage.jpg"
    }
})


const userModel = mongoose.model("users", userSchema);
module.exports = userModel;