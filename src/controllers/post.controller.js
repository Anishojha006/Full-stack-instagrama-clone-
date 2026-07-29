const postModel = require("../models/post.model.js");
const ImageKit   =  require('@imagekit/nodejs');
const  {toFile} = require('@imagekit/nodejs');
const jwt = require("jsonwebtoken");

const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req,res){

const token = req.cookies.token;


if(!token){

  return res.status(401).json({  // 401 status code stands for unauthorize request
    message:"Token not provided"
  })

}
try{
  
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
}
catch(err){
  res.status(401).json({
    message:"user unauthorized "
})
}
console.log(decoded);
const file_Details = await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'fileName',
  folder:"insta-clone"
});

const post = await postModel.create({
  caption:req.body.caption,
  imgUrl:file_Details.url,
  user:decoded.id
})

res.status(201).json({
    message:"Post created successfully",post
})
}

module.exports = {  createPostController };