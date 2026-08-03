const followModel = require("../models/follow.model.js");


async function followUserController(req,res){
 const followerUsername = req.user.username;
 const followeeUsernamw = req.params.username
}

module.exports = {followUserController};