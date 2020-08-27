const dataStore = require('nedb');
const express = require('express')

let postCollection = new dataStore({ filename: './post.db', autoload: true });

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

function updateBlog(blogPost, isAdmin) {
    return new Promise((resolve, reject) => {
        if(isAdmin){
            postCollection.update({_id: blogPost._id },  {title:blogPost.title, content:blogPost.content}, (err, updateDoc) => {
                resolve(updateDoc)
            });
            
        }else{
            postCollection.update({_id: blogPost._id,  user:blogPost.user },  blogPost, (err, updateDoc) => {
                resolve(updateDoc)
            });
            
        }
        });

}

function deleteBlog(id, user){
    return new Promise((resolve, reject) => {
        postCollection.remove({ _id: id,  user: user  }, {}, (err, numRemoved) => {
            resolve(numRemoved + " Blogpost has been removed!");
        });
    });
}


module.exports = { insertDB, findBlog, updateBlog, deleteBlog}