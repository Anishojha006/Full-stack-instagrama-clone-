const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const identifyingUser = require('../middlewares/auth.middleware.js');


/** 
@routes Post  /api/posts  
@Description this api will be protected => simply means  only those users which have valid tokn can reques on this api withoout valid token we will send 404 status code unauthorized
- req.body = {caption,img-file}
*/

postRouter.post("/",upload.single('image'), identifyingUser,postController.createPostController);

/** 
@route  /api/posts/  
@description => protected
*/
postRouter.get("/",identifyingUser,postController.getPostControllers);

/** 
@routes GET /api/posts/details/:postid
@description- return an details about specific post with the id. also check whether the post belongs to the user that the request come from 
*/

postRouter.get("/details/:postId",identifyingUser,postController.getPostDetailsController);
/**
 * @route Post /api/posts/like/:postid
 * @description like a post with the id provided in the
 */
postRouter.post("/like/:postId",identifyingUser,postController.likePostController);

/**
 * @route Post /api/posts/unlike/:postid
 * @description used to unlike an post
 */
postRouter.post("/unlike/:postId",identifyingUser,postController.unlikPostController);
/**
 * @route GET /api/posts/feed
 * @description get all the posts created in the data base 
 * @access Private
 */
postRouter.get("/feed",identifyingUser,postController.getFeedcontroller);

module.exports = postRouter;
