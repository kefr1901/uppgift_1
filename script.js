const express = require('express')
const dataStore = require('nedb')

const app = express()
let db = new dataStore({filename: './database.db', autoload: true});

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
app.post('/create/:title/:content', (req, res) => {
    var blogPost = { title: req.params.title, content: req.params.content };
    db.insert(blogPost, (err, newDoc)  => { 
        res.send(newDoc)
    });
})

//LÄSER IN EN ENSKILT BLOGGINLÄGG
app.get('/read/:id', (req, res) => {
  db.find({ _id: req.params.id }, function (err, docs) {
    res.send(docs)
  });
  
})

//UPPDATERAR BEFINTLIGA INLÄGG
app.put('/update/:id/:title/:content', (req, res) => {
 
  db.find({ _id: req.params.id },  (err, docs) => {
    
    db.update({_id:req.params.id}, {title: req.params.title , content: req.params.content }, (err, updateDoc) => {
    
     res.send(updateDoc)
      
  });
  
});

    //res.send(updateDoc);
})

app.get('/delete', (req, res) => {
    res.send('Nothing here!')
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})