//import express
const express = require("express");

//import post controller
const postController = require("../controllers/postController");

//import protect middleware
const protect = require("../middleware/authMiddleware")

//create new router
const router = express.Router();

//defining the routes
//localhost:3000/
router
 .route("/")
 .get(protect, postController.getAllPosts)
 .post(protect, postController.createPost);

router
 .route("/:id")
 .get(protect, postController.getOnePost)
 .patch(protect, postController.updatePost)
 .delete(protect, postController.deletePost);

 module.exports = touter;