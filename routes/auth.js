const router = require('express').Router();
const User = require("../models/User");

// Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    console.log(newUser);
    try {
        const user = await newUser.save();
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

});

module.exports = router;