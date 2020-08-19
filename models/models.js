const dataStore = require('nedb');
const express = require('express')

let postCollection = new dataStore({ filename: './post.db', autoload: true });
let commentCollection = new dataStore({ filename: './comment.db', autoload: true });

function insertDB(blogPost) {
    return new Promise((resolve, reject) => {
        postCollection.insert(blogPost, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findBlog(id) {
    return new Promise((resolve, reject) => {
        postCollection.find({ _id: id }, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateBlog(id, title, content, comment) {
    return new Promise((resolve, reject) => {
    postCollection.find({ _id: id }, (err, docs) => {
            postCollection.update({ _id: id }, { title, content, comment}, (err, updateDoc) => {
                resolve(updateDoc)
            });
        });
    });

}

function deleteBlog(id){
    return new Promise((resolve, reject) => {
    postCollection.find({ _id: id }, (err, docs) => {
        postCollection.remove({ _id: id }, {}, (err, numRemoved) => {
            resolve(numRemoved + " Blogpost has been removed!");
        });
    });
});
}


module.exports = { insertDB, findBlog, updateBlog, deleteBlog}