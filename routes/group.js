/**
 * Created by sparsh on 14/8/16.
 */
var express = require('express');
var Group = require('../models/Group');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', function (req, res) {

    // Add the group to the session data and render the html
    req.session.groupId = req.query.groupId;
    res.send({redirect : '/group/' + req.session.groupId });
});

router.get('/:groupId', function (request, response) {
    var groupId = request.params.groupId;
    Group.findById(mongoose.Types.ObjectId(groupId) , function (error, group) {
        if (error){
            response.redirect('/');
        }
        response.render('group' , {group : group});
    });
});

module.exports = router;