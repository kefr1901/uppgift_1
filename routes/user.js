const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.get("/", (req, res) => {
    res.render("./index")
})

userRouter.post('/create', async (req, res) => {
    userController.createUser(req, res);
})
userRouter.get('/read/', async (req, res) => {
    userController.findUsers(req, res)
})

userRouter.get('/read/:id', async (req, res) => {
    userController.findUser(req, res)
})

userRouter.patch('/update/:id', async (req, res) => {
    userController.updateUser(req, res); 
})

userRouter.delete('/delete/:id', async (req, res) => {
    userController.deleteUser(req, res);
})

module.exports = userRouter; 