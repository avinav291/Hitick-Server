var express = require('express');
var router = express.Router();


router.use(function (request, response, next) {
    response.locals.currentUser = request.user;
    response.locals.errors = request.flash("error");
    response.locals.infos = request.flash("info");
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index' );
});

module.exports = router;
