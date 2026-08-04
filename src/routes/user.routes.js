const express = require("express");
const userContrololr = require("../controllers/user.controller.js")
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
* @description Follow a user
* @access Private
  **/
userRouter.post("/unfollow/:username",identifyingUser,userContrololr.unfollowUserController);

/**
 * @route POST /api/users/send/friendrequest/:username
 * @description To send friend request
 * @access Private
 */

userRouter.post("/send/frinedrequest/:username",identifyingUser,userContrololr.sendingFriendRequest); 

module.exports = userRouter;