//LOGIKEN 
const express = require('express')
const router = express.Router()
const postModel = require("../models/postModel");

router.get("/", (req, res) => {
    res.render("./index")
})

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
async function createPost(req, res){
    var blogPost = { title: req.body.title, content: req.body.content, comment: req.body.comment };
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
    const updateBlog = await postModel.updateBlog(req.params.id, req.body.title, req.body.content, req.body.comment)
    res.json(updateBlog + "uppdaterad");
};

async function deleteBlog(req, res) {
    const deleteBlog = await postModel.deleteBlog(req.params.id)
    res.json({deleteBlog});
}


module.exports = { createPost, readOne, update, deleteBlog }