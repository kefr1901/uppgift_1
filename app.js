const express = require('express')
const controller = require('./controllers/controller')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/',controller); 

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})