const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");
const postController = require("../../../src/controllers/postController");
const userController = require("../../../src/controllers/userController");

const router = express.Router();

router.post('/home', function(req, res){
    res.send("Hey Shiv");
});

router.post("/category/all",categoryController.listCategories);
router.post("/post/add", postController.addPostData);
router.post("/post/category", postController.fetchPostByCategory);
router.post("/post/all", postController.allPosts);
router.post("/user/signup", userController.createUser)
router.post("/user/all",userController.getAllUsers);
router.post("/user/login", userController.login);

module.exports = router;