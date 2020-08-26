const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const secret = "hemlig"

app.use(express.json())

function auth(req,res,next){
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "")

    try{
        const payload = jwt.verify(token, secret)
        req.user = payload
        next()
    }catch(e){
        res.sendStatus(403)
    }
}

module.exports = {auth}