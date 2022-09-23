
//import post model tointeract with the mongodb to create post
const Post = require("../models/postModel") 

//to find controller for retrieving all posts
exports.getAllPosts = async (req, res, next) => {
    
    try {
        const posts = await Post.find(); //connects to db to retrieve all post

        res.status(200).json({
            status: "Success",
            results: posts.length,
            data: {
                posts,
            },
        });
    } 
    catch (e) {
        res.status(400).json ({
            status: "fail",
        });
    } 
}; 

//to find controller for retrieving individual posts
exports.getOnePost = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id); //connects to db to retrieve all post

        res.status(200).json({
            status: "Success",
            
            data: {
                post,
            },
        });
    } 
    catch (e) {
        res.status(400).json ({
            status: "fail",
        });
    } 
};

//creating a post
exports.createPost = async (req, res, next) => {

    try {
        const post = await Post.create(req.body); //connects to db to retrieve all post

        res.status(200).json({
            status: "Success",
            
            data: {
                post,
            },
        });
    } 
    catch (e) {
        res.status(400).json ({
            status: "fail",
        });
    } 
};

//to update a post
exports.updatePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params,id, req.body, {
            new: true,
            runValidators: true,
        }); 

        res.status(200).json({
            status: "Success",
            
            data: {
                post,
            },
        });
    } 
    catch (e) {
        res.status(400).json ({
            status: "fail",
        });
    } 
};

//to delete a post
exports.deletePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndDelete(req.params.id); 

        res.status(200).json({
            status: "Success",
        });
    } 
    catch (e) {
        console.log(e)
        res.status(400).json ({
            status: "fail",
        });
    } 
};
