/**
 * Created by sparsh on 12/8/16.
 */
var express = require('express');
var router = express.Router();

router.get('/' , function(request , response){
   response.render('login' , {currentUser  : null});
});

module.exports = router;