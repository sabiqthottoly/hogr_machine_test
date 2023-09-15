const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('./services')

router.post('/register', async (req, res) => {
    try {
        await createUser(req.body.userName, req.body.password);
        res.status(200).json({ message: "Sucessfully created user"})
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ message: "User creation failed"})
    }
})

router.post('/login', async (req, res) => {
    try {
        await loginUser(req.body.userName, req.body.password);
        res.status(200).json({ message: "Sucessfully loggedin user"})
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ message: "Loggin Failed" })
    }
})

module.exports = router; 

