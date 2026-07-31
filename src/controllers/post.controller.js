const postModel = require("../models/post.model.js");
const ImageKit   =  require('@imagekit/nodejs');
const  {toFile} = require('@imagekit/nodejs');


const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req,res){



const file_Details = await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'fileName',
  folder:"insta-clone"
});

const post = await postModel.create({
  caption:req.body.caption,
  imgUrl:file_Details.url,
  user:req.user.id
})

res.status(201).json({
    message:"Post created successfully",post
})
}

async function getPostControllers(req,res){



  const userId = req.user.id;

  const  posts =  await postModel.find({
    user:userId
  });

  if(!posts){

    return res.status(404).json({
      message:"no posts exist"
    });

  }

  res.status(200).json({
    message:"Posts fetched sucessfully",
    posts
  })
}

async function getPostDetailsController(req,res){


  
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if(!post){
    return res.status(404).json({
      message:"Post not found."
    })
  }
 console.log(post)
  const isValidUser = post.user.toString()  === userId;
  if(!isValidUser){
    return res.status(403).json({   //  403  status ccode represent that the user is authenticated but is not allowed to access the requested resources
      message:"Forbidden content."
    })
  }

  res.status(200).json({
    message:"post fetched sucessfully",post
  })

};

module.exports = { createPostController , getPostControllers ,getPostDetailsController };