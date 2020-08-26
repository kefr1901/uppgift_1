//LOGIKEN 
const express = require('express')
const router = express.Router()
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
    res.render("./index")
})


async function createUser(req, res){
    var user = { username: req.body.username, password: req.body.password};
    const result = await userModel.insertDB(user)
    res.json({result})

}

async function findUsers(req, res) {
    const users = await userModel.findUsers()
    res.json({users});
}


async function findUser(req, res) {
    const user = await userModel.findUser(req.params.id)
    res.json({user});
}

async function updateUser(req, res) {
    const updateUser = await userModel.updateUser(req.params.id, req.body.username, req.body.password)
    res.json(updateUser + "uppdaterad user");
};

async function deleteUser(req, res) {
    const deleteUser = await userModel.deleteUser(req.params.id)
    res.json(deleteUser + "User borttagen");
}


module.exports = { createUser, findUsers, findUser, updateUser, deleteUser }