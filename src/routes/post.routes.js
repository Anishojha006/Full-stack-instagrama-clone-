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


module.exports = postRouter;
