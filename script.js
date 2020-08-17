const express = require('express')
const dataStore = require('nedb')

const app = express()
let db = new dataStore({filename: './database.db', autoload: true});

app.post('/create/:title/:content', (req, res) => {
    var blogPost = { title: req.params.title, content: req.params.content };
    db.insert(blogPost, (err, newDoc)  => { 
        res.send(newDoc)
    });
})

app.get('/read/:id', (req, res) => {
  db.find({ _id: req.params.id }, function (err, docs) {
    
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    res.send(docs)
  });
  
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