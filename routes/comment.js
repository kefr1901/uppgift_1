const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController')
const auth = require('../middlewares/authorization')



commentRouter.get("/", (req, res) => {
    res.render("./index")
})

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
commentRouter.post('/create/:postId', async (req, res) => {
    commentController.createComment(req, res);

})

commentRouter.get('/read/', async (req, res) => {
    commentController.readComments(req, res)
});

//LÄSER IN EN ENSKILT BLOGGINLÄGG
commentRouter.get('/read/:id', async (req, res) => {
     commentController.readComment(req, res)
})


//UPPDATERAR BEFINTLIGA INLÄGG
commentRouter.patch('/update/:id', async (req, res) => {
    commentController.updateComment(req, res); 
})

commentRouter.delete('/delete/:id',  async (req, res) => {
    commentController.deleteComment(req, res);
})


module.exports = commentRouter; 