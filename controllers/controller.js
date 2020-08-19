//LOGIKEN 
const express = require('express')
const router = express.Router()
const modelsDB = require("../models/models");

router.get("/", (req, res) => {
    res.render("./index")
})

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
router.post('/create', async (req, res) => {
    var blogPost = { title: req.body.title, content: req.body.content, comment: req.body.comment };
    await modelsDB.insertDB(blogPost)
    res.render("./index")
    // res.send(blogPost)
})

//LÄSER IN EN ENSKILT BLOGGINLÄGG
router.get('/read/:id', async (req, res) => {
    const blog = await modelsDB.findBlog(req.params.id)
    res.send(blog)
})

//UPPDATERAR BEFINTLIGA INLÄGG
router.put('/update/:id/:title/:content/:comment', async (req, res) => {
    const updateBlog = await modelsDB.updateBlog(req.params.id, req.params.title, req.params.content, req.params.comment)
    res.json(updateBlog + "uppdaterad");
})

router.delete('/delete/:id', async (req, res) => {
    const deleteBlog = await modelsDB.deleteBlog(req.params.id)
    res.json(deleteBlog);
})


module.exports = router; 