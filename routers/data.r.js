const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const castC = require('../controllers/cast.c');
const movieC = require('../controllers/movie.c');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'db')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    dest: "db/", // "db"
    storage: storage
});

router.post('/',upload.array("myFiles", 2),(req,res,next) => {
    const files = req.files;
    console.log(files);
    movie_list = [];
    for (const file of files) {
        const absolutePath = path.join(__dirname.replace('routers',''), file.path);
        const jsonString = fs.readFileSync(absolutePath, "utf-8");
        const jsonObject = JSON.parse(jsonString);
        if(file.originalname === "casts.json"){
            for(const cast of jsonObject){
               castC.add(cast);
            }
        } else{
            if(file.originalname === "movies.json"){
                movie_list = jsonObject;
                for(const movie of jsonObject){
                    movieC.add(movie);
                }
            }
        }
    }
    res.redirect('/');
});

module.exports = router;