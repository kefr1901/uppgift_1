//LOGIKEN 
const express = require('express')
const router = express.Router()
const postModel = require("../models/postModel");

router.get("/", (req, res) => {
    res.render("./index")
})

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
async function createPost(req, res){
    var blogPost = { title: req.body.title, content: req.body.content, comment: req.body.comment , user: req.user.userId };
    const result = await postModel.insertDB(blogPost)
    res.json({result})

}


//LÄSER IN EN ENSKILT BLOGGINLÄGG
async function readOne(req, res) {
    const readOne = await postModel.findBlog(req.params.id)
    res.json({readOne});
}

//UPPDATERAR BEFINTLIGA INLÄGG
async function update(req, res) {
    var blogPost = { _id: req.params.id ,title: req.body.title, content: req.body.content, comment: req.body.comment , user: req.user.userId };
    const updateBlog = await postModel.updateBlog(blogPost, req.user.isAdmin)
    res.json(updateBlog + "uppdaterad");
};

async function deleteBlog(req, res) {
    const deleteBlog = await postModel.deleteBlog(req.params.id, req.user.userId)
    res.json({deleteBlog});
}


module.exports = { createPost, readOne, update, deleteBlog }