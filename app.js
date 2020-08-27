require('dotenv').config()
const express = require('express')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user');



const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs')

app.use('/post',postRouter); 
app.use('/comment', commentRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})