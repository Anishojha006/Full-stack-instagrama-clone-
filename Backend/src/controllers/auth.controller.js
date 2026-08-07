const userModel = require("../models/user.model.js");
const  bcrypt = require("bcrypt");
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
    const hashPassword = await bcrypt.hash(password,10); // 10 => here tellos number of layers of hashing
    const user = await userModel.create({
        username, email, password: hashPassword, bio, profileImage
    });

    const token = jwt.sign({
        id: user._id,
        username:user.username
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


    const CorrectPassword = await  bcrypt.compare(password,user.password);
    if (!CorrectPassword) {

        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,username:user.username
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

async function getmeController(req,res){
    const userId = req.user.id;

    const user =await userModel.findById(userId);
    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports ={ registerController,loginController,getmeController}