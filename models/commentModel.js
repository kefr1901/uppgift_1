const dataStore = require('nedb');
const express = require('express')

let commentCollection = new dataStore({ filename: './comments.db', autoload: true });

function insertDB(commentPost) {
    return new Promise((resolve, reject) => {
        console.log(commentPost);
        commentCollection.insert(commentPost, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findComments() {
    return new Promise((resolve, reject) => {
        commentCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findComment(id) {
    return new Promise((resolve, reject) => {
        commentCollection.find({ _id: id }, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateComment(id, title, content) {
    return new Promise((resolve, reject) => {
    commentCollection.find({ _id: id }, (err, docs) => {
            commentCollection.update({ _id: id }, { title, content}, (err, updateDoc) => {
                resolve(updateDoc)
            });
        });
    });

}

function deleteComment(id){
    return new Promise((resolve, reject) => {
        commentCollection.remove({ _id: id }, {}, (err, numRemoved) => {
            resolve(numRemoved + " Comment has been removed!");
        });
});
}


module.exports = { insertDB, findComments, findComment, updateComment, deleteComment}