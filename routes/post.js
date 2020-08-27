const postRouter = require('express').Router();
const postController = require('../controllers/postcontroller')
const auth = require('../middlewares/authorization');


postRouter.get("/", (req, res) => {
    res.render("./index")
})

postRouter.post('/create', auth, async (req, res) => {
    postController.createPost(req, res);
})

postRouter.get('/read/:id', async (req, res) => {
     postController.readOne(req, res)
})

postRouter.patch('/update/:id', auth, async (req, res) => {
    postController.update(req, res); 
})

postRouter.delete('/delete/:id', auth, async (req, res) => {
    postController.deleteBlog(req, res);
})


module.exports = postRouter; 