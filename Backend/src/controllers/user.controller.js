const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");

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
}

async function unfollowsUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeExist) {
        return res.status(404).json({
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


async function GetfriendRequestController(req, res) {
    const username = req.user.username;
    const allFriendRequest = await followModel.find({
        followee: `${username}`,
        Status: "pending"
    })

    if (!allFriendRequest) {
        return res.status(200).json({
            message: "No friend current  request"
        })
    }

    res.status(200).json({
        message: "Sucessfully fetched all friend request", allFriendRequest
    })

}

async function AcceptFriendRequestControlloer(req, res) {
    const username = req.user.username;
    const friendRequestId = req.params.requestId;
    const isRequestIdExist = await followModel.findOne({
        _id: friendRequestId,
        followee: username
    })
    console.log(isRequestIdExist);

    if (!isRequestIdExist) {
        return res.status(404).json({
            message: "This request does not exist"
        });
    }

    if (!(isRequestIdExist.Status === "pending")) {
        return res.status(200).json({
            message: `${isRequestIdExist.follower}'s request is ${isRequestIdExist.Status}`, isRequestIdExist
        })
    }

    const AcceptedRequest = await followModel.findByIdAndUpdate(
        friendRequestId, { Status: "accepted" }
    )

    res.status(201).json({
        message: `${AcceptedRequest.follower} friend request accepted`, AcceptedRequest
    })

}

async function RejectFriendRequestController(req, res) {
    const username = req.user.username;
    const friendRequestId = req.params.requestId;

    const isRequestIdExist = await followModel.findOne({
        _id: friendRequestId,
        followee: username
    });

    if (!isRequestIdExist) {
        return res.status(404).json({
            message: "This request does not exist"
        });
    }
    const isRequestAlreadyRejected = isRequestIdExist.Status === "rejected";
    if (isRequestAlreadyRejected) {
        return res.status(200).json({
            message: "request already rejected",isRequestAlreadyRejected
        })
    }
    const RejectedRequest = await followModel.findByIdAndUpdate(
        friendRequestId, { Status: "rejected" }
    )

    res.status(201).json({
        message: `${RejectedRequest.follower} friend request rejected`,RejectedRequest
    })

}


module.exports = { followUserController, unfollowsUserController, GetfriendRequestController, AcceptFriendRequestControlloer, RejectFriendRequestController };