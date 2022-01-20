const post = require("../models/postData");

function addPostData(req, res){
    let data = req.body;
    let responseSend = {
        msg : "error in adding the post",
        success : false,
        result : ""
    }

    if(data.content && data.categories && data.username){
        post.addPostData(data, function(err, result){
            if(err){
                console.log("error in adding the post");
                return res.status(500).send(responseSend);
            }else{
                console.log("Post added successfully");
                responseSend.msg = "Post added successfully";
                responseSend.success = true;
                responseSend.result = result;
    
                return res.status(200).send(responseSend);
            }
        })
    }

    
}

function fetchPostByCategory(req, res){
    let data = req.body;

    let responseSend = {
        msg : "error in fetching the post",
        success : false,
        result : ""
    }

    post.fetchPostByCategory(data, function(err, result){
        if(err){
            console.log("error in fetching the post");
            return res.status(500).send(responseSend);
        }else{
            console.log("Post fetched successfully");
            responseSend.msg = "Post fetched successfully";
            responseSend.success = true;
            responseSend.result = result;

            return res.status(200).send(responseSend);
        }
    })
}


function allPosts(req, res){
    let data = req.body;

    let responseSend = {
        msg : "error in fetching the post",
        success : false,
        result : ""
    }

    post.allPosts(function(err, result){
        if(err){
            console.log("error in fetching the post");
            return res.status(500).send(responseSend);
        }else{
            console.log("Post fetched successfully");
            responseSend.msg = "Post fetched successfully";
            responseSend.success = true;
            responseSend.result = result;

            return res.status(200).send(responseSend);
        }
    })
}


module.exports = { addPostData , fetchPostByCategory , allPosts};