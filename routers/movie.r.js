const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');

router.get('/:MovId',async (req,res,next) => {
    const MovId = req.params.MovId;
    const movie = await movieC.getById(MovId);
    res.render('movie_detail', { check: false, chk: req.session.user, movie: movie[0], title: "Movie Detail" });
});

module.exports = router;