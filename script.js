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

// LÄSER IN ALLA BLOGGINLÄGG
app.get('/read', (req, res) => {
    db.find({}, (err, docs) => {
      res.send(docs)
    });
    
  })

//UPPDATERAR BEFINTLIGA INLÄGG
app.put('/update/:id/:title/:content', (req, res) => {
 
  db.find({ _id: req.params.id },  (err, docs) => {
    
    db.update({_id:req.params.id}, {title: req.params.title , content: req.params.content }, (err, numReplaced) => {
    
     res.send(numReplaced)
      
  });
  
});

})

//RADERAR BLOGGINLÄGGET SOM MATCHAR ID:T
app.delete('/delete/:id', (req, res) => {
    db.find({ _id: req.params.id },  (err, docs) => {
        db.remove({ _id: req.params.id }, {},  (err, numRemoved) => {
            res.send(numRemoved + " Blogpost has been removed!");
          });
    });
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})