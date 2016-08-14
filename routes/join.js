/**
 * Created by sparsh on 13/8/16.
 */
var express = require('express');
var Group = require('../models/Group');
var User = require('../models/User');

var router = express.Router();


router.post('/', function (request, response, next) {
    var groupName = request.body.groupName;
    var groupPassword = request.body.groupPassword;

    Group.findOne({groupName: groupName}, function (error, group) {
        if (error) {
            next(error);
        }
        if (!group) {
            request.flash('error', 'No such group exists');
            response.send({redirect: '/'});
        }
        var currentUser = request.user;
        group.checkPassword(groupPassword, function (error, isMatch) {
            console.log(groupPassword);
            if (error) {
                next(error);
            }
            if (!isMatch) {
                request.flash('error', 'Incorrect Password');
                response.send({redirect: '/'});
            }
            else {
                // Increase the members of the group
                Group.update({_id: group._id}, {$inc: {groupMembers: 1}}, null, function (incrementError) {
                    if (incrementError) {
                        next(incrementError);
                    }
                    // Add the group _id to the currentUser's groups array
                    User.update({_id: currentUser._id}, {$push: {groups: group._id}}, null, function (err) {
                        if (err) {
                            next(err);
                        }
                        console.log("Udated the groups array");
                        next();
                    });
                });


            }
        });
    });
}, function (request, response) {
    response.send({redirect: '/'});
});

module.exports = router;