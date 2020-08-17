const express = require('express')
const app = express()

//app.use(express.static('resources'))

app.get('/create', (req, res) => {
  res.send('Nothing here!')
})

app.get('/read', (req, res) => {
  res.send('Nothing here!')
})

app.get('/update', (req, res) => {
    res.send('Nothing here!')
})

app.get('/delete', (req, res) => {
    res.send('Nothing here!')
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})