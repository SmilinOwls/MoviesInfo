const express = require('express');
const movieC = require('../controllers/movie.c');
const router = express.Router();

router.get('/',(req,res,next) => {
    const key = req.query.key;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 3;
    var pageTotal = 0, offset = 0;
    movieC.search(key).then(data => {
        pageTotal = Math.floor(data.length / pageSize) + (data.length  % pageSize == 0? 0: 1);
        offset = (page - 1)*pageSize;
        data = data.slice(offset, offset + pageSize)
        const pages = [];
        for(let i = 0; i < pageTotal; i++){
            pages[i] = {value: i + 1, active: (i + 1) === page, key: key}
        }
        const navs = {};
        if(page > 1){
            navs.prev = page - 1;
        }

        if(page < pageTotal) {
            navs.next = page + 1;
        }

        res.render('home', { check: false, movies: data, chk: req.session.user, pages: pages, navs: navs, key: key, title: "Search Movie", type: "Search Movie Results" });
    }).catch(err => next(err));
});

module.exports = router;