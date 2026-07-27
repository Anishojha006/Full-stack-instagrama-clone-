const userModel = require("../models/user.model.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async  function registerController (req, res){
    const { email, username, password, bio, profileImage } = req.body;

    const isuserAlredayExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isuserAlredayExist) {
        return res.status(409).json({
            message:  (isuserAlredayExist.email === email ? "Email already exist" : "username already exist")
        });
    }
    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        username, email, password: hashPassword, bio, profileImage
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);
    res.status(201).json({
        message: "user created sucessfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res){

    const { username, email, password } = req.body;


    const user = await userModel.findOne({
        $or: [  // this arraqy contains conditions
            { username: username }, { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");

    const CorrectPassword = user.password === hashPassword;
    if (!CorrectPassword) {

        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token);

    res.status(200).json({
        message: "logedin sucessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports ={ registerController,loginController}