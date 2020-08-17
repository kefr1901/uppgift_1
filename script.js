const express = require('express')
const dataStore = require('nedb')

const app = express()
let db = new dataStore({filename: './database.db', autoload: true});

var blogPost = { title: 'test', content: 'testar' };

db.insert(blogPost, (err, newDoc)  => {   // Callback is optional
    console.log(newDoc);
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});


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