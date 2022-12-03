const express = require('express');
const router = express.Router();
const castC = require('../controllers/cast.c');
const movieC = require('../controllers/movie.c');

router.get('/:CasId',async (req,res,next) => {
    const CasId = req.params.CasId;
    const cast = await castC.allByCastId(CasId);
    const movie = await movieC.getByCasId(CasId);
    res.render('cast_detail', { check: false, chk: req.session.user, cast: cast[0], movie: movie, title: "Cast Detail" });
});

module.exports = router;