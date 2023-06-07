const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verify = require("../verifyToken");

// Update User

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = ({
                password: hash,
            })
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedUser);

        } catch (err) {
            res.status(500).json(err);

        }
    } else {
        res.status(500).json({ error: 'You can update only your account' });

    }


})

// Delete User


router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted');

        } catch (err) {
            res.status(500).json(err);

        }
    } else {
        res.status(500).json({ error: 'You can Delete only your account' });

    }


})

// GET User

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);

    } catch (err) {
        res.status(500).json(err);

    }
})

// GET ALL User
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (!req.user.isAdmin) {
        try {
            const user = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);

        }
    } else {
        res.status(500).json({ error: 'You can Not Allowed to see all users' });

    }

})

// GET ALL STATS
router.get('/stats', async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(401).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json(err)
    }
})

module.exports = router;