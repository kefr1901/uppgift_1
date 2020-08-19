const dataStore = require('nedb');
const express = require('express')

let db = new dataStore({ filename: './database.db', autoload: true });

function insertDB(blogPost) {
    return new Promise((resolve, reject) => {
        db.insert(blogPost, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findBlog(id) {
    return new Promise((resolve, reject) => {
        db.find({ _id: id }, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateBlog(id, title, content) {
    return new Promise((resolve, reject) => {
    db.find({ _id: id }, (err, docs) => {
            db.update({ _id: id }, { title, content}, (err, updateDoc) => {
                resolve(updateDoc)
            });
        });
    });

}

function deleteBlog(id){
    return new Promise((resolve, reject) => {
    db.find({ _id: id }, (err, docs) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            resolve(numRemoved + " Blogpost has been removed!");
        });
    });
});
}


module.exports = { insertDB, findBlog, updateBlog, deleteBlog}