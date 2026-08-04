const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");
const friendRequestModel = require("../models/friend.model.js");
 
async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username
    console.log(followerUsername, followeeUsername);

    if (followerUsername === followeeUsername) {

        return res.status(401).json({
            message: "You cannot follow yourself"
        })
    }


    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {

        return res.status(422).json({
            message: `You are already folowing ${followeeUsername}`, isAlreadyFollowing
        })
    }

    const followeeExist = await userModel.findOne({
        username: followeeUsername
    })
    console.log(followeeExist);
    if (!followeeExist) {
        return res.status(404).json({
            message: "The user you want to follow does not exist"
        })
    }
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    });

    res.status(201).json({
        message: `You are now following ${followeeUsername}`, followRecord
    })
}a

async function uenfollowsUserCuontroller(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeExist) {
     return    res.status(404).json({
            message: `This followee does not exist`
        })
    }

    const isUserfollowingExist = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserfollowingExist) {
        return res.status(404).json({
            message: `You donot follow this ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserfollowingExist._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function ssendiungFriendRequest(req,res){
 const sender = req.user.username;
 const receiver= req.params.username;
 
 const

}

module.exports = { followUserController, unfollowUserController };