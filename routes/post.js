const postRouter = require('express').Router();
const postController = require('../controllers/postcontroller')
const auth = require('../middlewares/authorization');


postRouter.get("/", (req, res) => {
    res.render("./index")
})

postRouter.post('/create', async (req, res) => {
    postController.createPost(req, res);
})

postRouter.get('/read/:id', async (req, res) => {
     postcontroller.readOne(req, res)
})

postRouter.patch('/update/:id', async (req, res) => {
    postcontroller.update(req, res); 
})

postRouter.delete('/delete/:id', async (req, res) => {
    postController.deleteBlog(req, res);
})


module.exports = postRouter; 