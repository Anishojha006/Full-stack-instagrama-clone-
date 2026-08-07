const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller.js");
const identifyingUser = require("../middlewares/auth.middleware.js");

/**
 * @route  api/auth/register
 * @description used to register
 * @access Private
 */
authRouter.post("/register", authController.registerController);

/**
 * @route  api/auth/login
 * @description used to login an user
 * @access Private
 */
authRouter.post("/login",authController.loginController);

/**
 * @route  api/auth/getme
 * @description used to get currently loggedin users information
 * @access Private
 */
authRouter.get("/getme",identifyingUser,authController.getmeController)

module.exports = authRouter;
