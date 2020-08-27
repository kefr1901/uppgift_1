const dataStore = require('nedb');
const express = require('express')
const bcrypt = require('bcryptjs');

let userCollection = new dataStore({ filename: './user.db', autoload: true });

function insertDB(user) {
    return new Promise(async(resolve, reject) => {

       if(await checkUserNameExist(user.username)){
           reject("User already exist");
       }
        
        user.password = bcrypt.hashSync(user.password, 10)
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

function checkUserNameExist(username) {
    return new Promise((resolve, reject) => {
        userCollection.find({ "username": username}, function (err, docs) {
          if(docs.length>0){
            resolve(true)
          }
          else{
              resolve(false)
          }
        });
    })
}

function authUser(username, password) {
    console.log("kommer in i authUser")

    return new Promise((resolve, reject) => {
        userCollection.findOne({username: username }, function (err, docs)  {
            if(docs == null){
                return reject('No user found')
            }
            if(!bcrypt.compareSync(password,docs.password)){
                return reject('Invalid password, try again')
            }

            resolve(docs)
            console.log(docs)
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


module.exports = { insertDB, findUsers, findUser, updateUser, deleteUser, authUser}