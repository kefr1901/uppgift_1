const dataStore = require('nedb');
const express = require('express')

let userCollection = new dataStore({ filename: './user.db', autoload: true });

function insertDB(user) {
    return new Promise((resolve, reject) => {
        userCollection.insert(user, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}
function findUsers() {
    return new Promise((resolve, reject) => {
        userCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findUser(id) {
    return new Promise((resolve, reject) => {
        userCollection.find({ _id: id }, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateUser(id, username, password) {
    return new Promise((resolve, reject) => {
    user.find({ _id: id }, (err, docs) => {
            userCollection.update({ _id: id }, {username, password}, (err, updateDoc) => {
                resolve(updateDoc)
            });
        });
    });

}

function deleteUser(id){
    return new Promise((resolve, reject) => {
    postCollection.find({ _id: id }, (err, docs) => {
        postCollection.remove({ _id: id }, {}, (err, numRemoved) => {
            resolve(numRemoved + " Username has been removed!");
        });
    });
});
}


module.exports = { insertDB, findUsers, findUser, updateUser, deleteUser}