const express = require("express");
const userContrololr = require("../controllers/user.controller.js");
const identifyingUser = require("../middlewares/auth.middleware.js");

const userRouter = express.Router();
/**
* @route POST  /api/users/follow/:username
* @description Follow a user
* @access Private
  **/
userRouter.post("/follow/:username",identifyingUser,userContrololr.followUserController);

/** 
* @route POST  /api/users/unfollow/:username
* @description unfollow a user
* @access Private
  **/
userRouter.post("/unfollow/:username",identifyingUser,userContrololr.unfollowsUserController);


/**
 * @route GET /api/users/get/request
 * @description to get all friend request
 * @access Private
 */

userRouter.get("/get/request",identifyingUser,userContrololr.GetfriendRequestController);

/**
 * @route PUT /api/users/acceptRequest/requestId
 * @description to accept request
 * @access Private
 */

userRouter.put("/acceptRequest/:requestId",identifyingUser,userContrololr.AcceptFriendRequestControlloer);

/**
 * @route PUT api/users/rejectRequest/requestId
 * @descrription to reject an friend request by an receiver
 * @access Private
 */

userRouter.put("/rejectRequest/:requestId",identifyingUser,userContrololr.RejectFriendRequestController);

/**
 * @route GET api/getfolloers
 * @description to retive all the follwers
 * @acess Private
 */

userRouter.get("/getfollower",identifyingUser,userContrololr.getfollower);

module.exports = userRouter;

