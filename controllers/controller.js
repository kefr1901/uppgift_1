//LOGIKEN 
const express = require('express')
const router = express.Router()
const modelsDB = require("../models/models");
//const models = require("../models/models");

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
router.post('/create/:title/:content', async (req, res) => {
    var blogPost = { title: req.params.title, content: req.params.content };
    await modelsDB.insertDB(blogPost)
    res.send(blogPost)

})

//LÄSER IN EN ENSKILT BLOGGINLÄGG
router.get('/read/:id', async (req, res) => {

    const blog = await modelsDB.findBlog(req.params.id)
    res.send(blog)

})

//UPPDATERAR BEFINTLIGA INLÄGG
router.put('/update/:id/:title/:content', async (req, res) => {

    const updateBlog = await modelsDB.updateBlog(req.params.id, req.params.title, req.params.content)

    res.json(updateBlog + "uppdaterad");
    
    
})


router.delete('/delete/:id', async (req, res) => {
    const deleteBlog = await modelsDB.deleteBlog(req.params.id)
    res.json(deleteBlog);
})


module.exports = router; 