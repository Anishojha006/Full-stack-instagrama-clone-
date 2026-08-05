const express = require("express");
const app = express(); // creating an instance of an server 
const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cookieParser());

/*require routes **/
const postRouter = require("../src/routes/post.routes.js");
const userRouter = require("../src/routes/user.routes.js");
const authRouter = require("../src/routes/auth.routes.js");


// using routes
// post method api name /api/auth/register
app.use("/api/auth",authRouter);
// route for below is /api/auth/
app.use("/api/posts",postRouter);
app.use("/api/users",userRouter);

module.exports = app ;