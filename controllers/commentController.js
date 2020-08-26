//LOGIKEN 
const express = require('express')
const router = express.Router()
const commentModel = require("../models/commentModel");

router.get("/", (req, res) => {
    res.render("./index")
})

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
async function createComment(req, res){
    var commentPost = { postId: req.params.postId, title: req.body.title, content: req.body.content };
    const result = await commentModel.insertDB(commentPost)
    res.json({result})

}

async function readComments(req, res) {
    const readComments = await commentModel.findComments()
    res.json({readComments});
}

//LÄSER IN EN ENSKILT BLOGGINLÄGG
async function readComment(req, res) {
    const readOne = await commentModel.findComment(req.params.id)
    res.json({readOne});
}

//UPPDATERAR BEFINTLIGA INLÄGG
async function updateComment(req, res) {
    const updateComment = await commentModel.updateComment(req.params.id, req.body.title, req.body.content, req.body.comment)
    res.json(updateComment + "uppdaterad");
};

async function deleteComment(req, res) {
    const deleteBlog = await commentModel.deleteComment(req.params.id)
    res.json(deleteBlog);
}


module.exports = { createComment, readComments, readComment, updateComment, deleteComment }