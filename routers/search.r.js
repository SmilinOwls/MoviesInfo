const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.send(req.query);
    console.log(req.query);
});

module.exports = router;