const express = require('express');
const router = express.Router();
const userC = require('../controllers/user.c');

const CryptoJs = require('crypto-js');
const hashLength = 64;

router.post('/signup', async (req, res, next) => {

    const un = req.body.Username, pw = req.body.Password;
    const user = await userC.byName(un);
    if (user.length > 0) {
        res.render('sign-up', { exist: true, title: "Sign up" });
    } else {
        const salt = Date.now().toString(16);
        const pwSalt = pw + salt;
        const pwHashed = CryptoJs.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJs.enc.Hex);
        if (pw != req.body.Repassword) {
            res.render('sign-up', { check: true, title: "Sign up" });
        } else {
            const user = {
                Username: un,
                Password: pwHashed + salt,
                Name: req.body.Name,
                Email: req.body.Email,
                Dob: req.body.Dob,
                Permission: 0,
            }

            userC.add(user)
                .then(result => console.log(result))
                .catch(error => console.log(error));

            res.redirect('/user/signin');
        }
    }
})


router.post('/signin', async (req, res, next) => {
    const un = req.body.Username, pw = req.body.Password;
    const uDb = await userC.byName(un);
    if (uDb.length == 0) {
        res.render('sign-in', { check: true });
    } else {
        const pwDb = uDb[0].f_Password;
        const salt = pwDb.slice(hashLength);
        const pwSalt = pw + salt;
        const pwHashed = CryptoJs.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJs.enc.Hex);
        if (pwDb == (pwHashed + salt)) {
            if (req.body.Remember) res.cookie('user', uDb[0]);
            req.session.user = uDb[0];
            res.redirect('/');
        } else {
            res.render('sign-in', { check: true, title: "Sign in" });
        }
    }
});

router.get('/signup', (req, res, next) => {
    res.render('sign-up', { check: false, title: "Sign up" });
});

router.get('/signin', (req, res, next) => {
    const lastUser = req.cookies.user;
    res.clearCookie("user");
    res.render('sign-in', { check: false, user: lastUser, title: "Sign in" });
});

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.redirect('signin');
});

router.get('/profile', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('signin');
    } else {
        res.redirect('/', { chk: true });
    }
});

module.exports = router;