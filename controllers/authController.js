const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const secret = "hemlighet"
const payload = { userId: 1337 }
console.log(payload);

function login(req, res) {
    
    const user = await userModel.findUser({username: req.body.username})
    
   
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    console.log(token)
    try {
        const decrypted = jwt.verify(token, secret)
        res.json({decrypted});
        console.log(decrypted);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log("Log in again fool")
        } else {
            console.log(error)
        }
    }
}


module.exports = {login}