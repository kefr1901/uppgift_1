const express = require('express')
const dataStore = require('nedb')
const pug = require('pug');

// Compile the source code
//const compiledFunction = pug.compileFile('template.pug');

// Compile template.pug, and render a set of data
/*
console.log(pug.renderFile('template.pug', {
  name: 'Timothy'
}));
*/
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
/*
console.log(compiledFunction({
  name: 'Forbes'
}));
*/
// "<p>Forbes's Pug source code!</p>"

const app = express();
app.set('view engine', 'pug');
let db = new dataStore({filename: './database.db', autoload: true});

/*
app.get('/', function (req, res) {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!' });
});
*/

//LÄGGER TILL NYA BLOGGINLÄGG I DATABASEN
app.post('/create/:title/:content', (req, res) => {
    var blogPost = { title: req.params.title, content: req.params.content };
    db.insert(blogPost, (err, newDoc)  => { 
        res.send(newDoc)
    });
});

//LÄSER IN EN ENSKILT BLOGGINLÄGG
app.get('/read/:id', (req, res) => {
  db.find({ _id: req.params.id }, function (err, result) {
    let blogPost = result[0];
    let title = blogPost.title;
    let content = blogPost.content;
    let blogId = blogPost._id;
    
    //res.send(docs)
    res.render('index.pug', { title: title, content: content, id: blogId });
  });
});

// LÄSER IN ALLA BLOGGINLÄGG
app.get('/read', (req, res) => {
    db.find({}, (err, docs) => {
      res.send(docs)
    });  
});

//UPPDATERAR BEFINTLIGA INLÄGG
app.put('/update/:id/:title/:content', (req, res) => {
  db.find({ _id: req.params.id },  (err, docs) => {    
    db.update({_id:req.params.id}, {title: req.params.title , content: req.params.content }, (err, numReplaced) => {    
     res.send(numReplaced)      
    });
  });
});

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
});