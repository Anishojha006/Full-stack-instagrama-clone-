const express = require("express");
const userContrololr = require("../controllers/user.controller.js")
const identifyingUser = require("../middlewares/auth.middleware.js");

const userRouter = express.Router();
/*
* @route POST  /api/users/follow/:userid
* @description Follow a user
* @access Private
  **/
userRouter.post("/follow/:username",identifyingUser,userContrololr.followUserController);

module.exports = userRouter;