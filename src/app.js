const express = require("express");
const app = express(); // creating an instance of an server 
const cookieParser = require("cookie-parser");
const authRouter = require("../src/routes/auth.routes.js");
const postRouter = require("../src/routes/post.routes.js");


app.use(express.json());
app.use(cookieParser());
// post method api name /api/auth/register
app.use("/api/auth",authRouter);
// route for below is /api/auth/
app.use("/api/auth",postRouter); 

module.exports = app ;