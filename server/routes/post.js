const express = require('express');
let router = express.Router();
const file = require('../utils/fileUpload');
const posts = require('../models/post.js');

router.get('/', async (req,res)=>{
    let page = req.query.page || 0
    let limit = 5;
    let offset = page * limit
    try{
        let postData = await posts.find().limit(limit).skip(offset).exec(function(err, post){
            posts.countDocuments().exec(function(err, count){
                res.status(200).json({
                    post:post,
                    limit:limit,
                    currentPage:page,
                    totalCount:count
                });
            });
        });
    }catch(err){
        console.error(err)
        res.status(204).json({err})
    }
 
});

router.get('/query', async(req,res)=>{
    let keyword = req.query.keyword;
    let type = req.query.type;
    try{
        if(type=="name"){
            posts.collection.createIndex({'postName':"text"});
        }
        else if(type =="content"){
            posts.collection.createIndex({'postContents':"text"});
        }
        else if(type =='author'){
            posts.collection.createIndex({'postAuthor':"text"});
        }
        else if(type == 'name_content'){
            posts.collection.createIndex({"postName":"text", "postContents":"text"});
        }
        let queryData = await posts.find({$text:{$search:keyword}}).limit(limit).skip(offset).exec(function(err, post){
            post.countDocuments().exec(function(err, count){
                posts.collection.dropIndexes()
                res.status(200).json({
                    post:post,
                    limit:limit,
                    currentPage:page,
                    totalCount:count
                });
            });
        });
    }catch(err){
        console.error(err)
        posts.collection.dropIndexes();
        res.status(204).json({err});
    }
})

router.get('/document'), async (req,res)=>{
    let id = req.query.id;
    try{
        let post = await posts.findOne({"postNo":id})
        res.status(200).json({post})
    }
    catch(err){
        console.error(err);
        res.status(204).json({err})
    }
}

router.post('/write', async (req,res)=>{
    let post = new posts()
    //console.log(req.body.name)
    //console.log(req.body.price)
    //console.log(req.file.filename)
    let postNo = 0;
    try{
        let no = await posts.find().select("postNo").limit(1).sort({"postNo":"desc"})
        
        postNo = no[0].postNo+1;
    }
    catch(err){
        console.error(err)
        res.json();
    }
    post.postName = req.body.postName;
    post.postContents = req.body.postContent;
    post.postView = 0;
    post.postAuthor = req.user.uid
    post.postRate = 0;
    post.postComment = 0,
    post.postNo = postNo

    //console.log("this is working?")
    
    //console.log(saveData)
    try{
        let saveData = await post.save();
        //console.log(saveData);
        res.status(200).json();

    }catch(err){
        console.error(err);
        res.status(204).json({err})
    }
});
module.exports = router;