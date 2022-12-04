const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const reload = require('reload');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const app = express();
const dataR = require('./routers/data.r');
const userR = require('./routers/user.r');
const movieR = require('./routers/movie.r');
const castR = require('./routers/cast.r');
const searchR = require('./routers/search.r');
const movieC = require('./controllers/movie.c');
const port = 20234;

// Static public files
app.use(express.static(path.join(__dirname, '/public')));

// POST method handle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies
app.use(cookieParser());
app.use(cookieSession({ secret: 'secret', cookie: { maxAge: 60 * 60 * 1000 } }));

// Template engine config
app.engine('hbs', handlebars.engine({
    extname: '.hbs', defaultLayout: 'main', helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res, next) => {
    movieC.getByRating().then(data => {
        res.render('home', { check: false, movies: data, chk: req.session.user, title: "Home", type: "Top Ratings" });
    })
    .catch(error => next(error));
});

app.use('/user', userR);

app.use('/file',dataR);

app.use('/movie',movieR);

app.use('/cast',castR);

app.use('/search',searchR);

// Error middleware
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

http.createServer(app)
    .listen(port, () => { console.log(`Listening on port ${port}`) });
reload(app);