const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller.js");

authRouter.post("/register", authController.registerController);
/*
{username:undefined,email:test@test.com,password:test}  = req.body
**/
authRouter.post("/login",authController.loginController);

module.exports = authRouter;
