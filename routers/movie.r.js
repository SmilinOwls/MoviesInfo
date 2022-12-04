const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');

function isAuthorized(req, res, next) {
    if (!req.session.user) {
        res.redirect('/user/signin');
    }
    else next();
};


router.get('/:MovId/', async (req, res, next) => {
    const MovId = req.params.MovId;
    const movie = await movieC.getById(MovId);

    res.render('movie_detail', {check: false, chk: req.session.user, movie: movie[0], title: "Movie Detail" });
});

router.get('/favorite/add/:MovId', isAuthorized, async (req, res, next) => {
    const user = req.session.user;
    const MovId = req.params.MovId;
    const movie = await movieC.getById(MovId);
    movieC.addF(user, movie[0]).then(async () => {
        const movie_list = await movieC.allF(user.f_ID);
        res.render('curd', { check: false, chk: req.session.user, movie_list: movie_list, title: "Favorite Movie" });
    }).catch(err => next(err));
});

router.get('/', async (req, res, next) => {
    const user = req.session.user;
    const movie_list = await movieC.allF(user.f_ID);
    res.render('curd', { check: false, chk: req.session.user, movie_list: movie_list, title: "Favorite Movie" });
});

router.post('/favorite/delete/:MovId', async (req, res, next) => {
    const user = req.session.user;
    const MovId = req.params.MovId;
    movieC.delF(user.f_ID, MovId).then(async () => {
        const movie_list = await movieC.allF(user.f_ID);
        res.render('curd', { check: false, chk: req.session.user, movie_list: movie_list, title: "Favorite Movie" });
    }).catch(err => next(err));
});

router.post('/favorite/edit/:MovId', async (req, res, next) => {
    const user = req.session.user;
    const MovId = req.params.MovId;
    const movie_list = await movieC.allF(user.f_ID);
    for (const movie of movie_list) {
        movie.isEdit = false;
        if (movie.MovId == MovId) movie.isEdit = true;
    }
    res.render('curd', { check: false, chk: req.session.user, movie_list: movie_list, title: "Favorite Movie" });
});

router.post('/favorite/update/:MovId', async (req, res, next) => {
    const user = req.session.user;
    const mov = {
        MovId: req.params.MovId,
        MovTitle: req.body.movTitle,
        MovYear: req.body.movYear,
        MovRating: req.body.movRating
    }
    console.log(mov);
    movieC.updateF(mov).then(async () => {
        const movie_list = await movieC.allF(user.f_ID);
        for (const movie of movie_list) {
            movie.isEdit = false;
        }
        res.render('curd', { check: false, chk: req.session.user, movie_list: movie_list, title: "Favorite Movie" });
    }).catch(err => next(err));
});

module.exports = router;