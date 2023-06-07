const router = require('express').Router();
const verify = require("../verifyToken");
const Movie = require("../models/Movie");

// CREATE Movie
router.post('/', verify, async (req, res) => {
    if (!req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);

        } catch (err) {
            console.log(err);
            res.status(404).json(err);

        }
    }

});

// DELETE Movie
router.delete('/:id', verify, async (req, res) => {
    if (!req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);

            res.status(201).json("The Movie Has Been Deleted");

        } catch (err) {
            console.log(err);
            res.status(404).json(err);

        }
    }

});

// GET Movie
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(201).json(movie);

    } catch (err) {
        console.log(err);
        res.status(404).json(err);

    }

});


// GET Random Movie | Series
router.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Get all movie

router.get('/', verify, async (req, res) => {
    if (!req.user.isAdmin) {
        try {

            const movies = await Movie.find();
            res.status(201).json(movies.reverse());

        } catch (err) {
            console.log(err);
            res.status(404).json(err);

        }
    }

});


module.exports = router;