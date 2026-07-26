const express = require("express");
const userModel = require("../models/user.model.js");
const crypto = require("crypto");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    const { email, username, password, bio, profileImage } = req.body;

    // const isuserAlredayExist = userModel.findOne({
    //     email
    // });

    // if (isuserAlredayExist) {
    //     return res.status(409).json({
    //         message: "user already exist"
    //     })
    // }

    //    const isusernameAlreadyExist = userModel.findOne({
    //     username
    // });

    // if (isusernameAlreadyExist) {
    //     return res.status(409).json({
    //         message: "username already exist"
    //     });
    // }
    // or operatoe is used to return an user withany of the username or email from the database 
    const isuserAlredayExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isuserAlredayExist) {
        return res.status(409).json({
            message: "user already exist" + (isuserAlredayExist === email ? "Email already exist" : "username already exist")
        });
    }
    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        username, email, password: hashPassword, bio, profileImage
    });

    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET);
    res.cookie("toekn",token);
});
