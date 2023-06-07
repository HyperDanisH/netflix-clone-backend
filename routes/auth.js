const router = require('express').Router();
const User = require("../models/User");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// Register
router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    });

    // console.log(newUser);
    try {
        const user = await newUser.save();
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

});

//  Login

router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(401).json({ error: "Wrong password or email" });
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password);

        if (!comparePass) {
            res.status(401).json({ error: "Wrong password or email" });
        }

        const jsonwebtoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "10d" });

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, jsonwebtoken });

    } catch (error) {
        console.log(error);
        res.status(404).json(error);

    }

})


module.exports = router;