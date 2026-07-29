const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

/*  
Post  /api/posts  this api will be protected => simply means  only those users which have valid tokn can reques on this api withoout valid token we will send 404 status code unauthorized
- req.body = {caption,img-file}
**/

postRouter.post("/",upload.single('image'),postController.createPostController);

/*
  /api/posts/  => protected
**/
postRouter.get("/",postController.getPostControllers);

/*
GET /api/posts/details/:postid
- return an details about specific post with the id. also check whether the post belongs to the user that the request come from 
**/

postRouter.get("/details/:postId",postController.getPostDetailsController);


module.exports = postRouter;
