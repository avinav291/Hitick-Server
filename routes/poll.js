/**
 * Created by sparsh on 16/8/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Poll = require('../models/Poll');
var Group = require('../models/Group');

router.post('/', function (req, res) {
    console.log("Poll post handler called");
    var groupId = mongoose.Types.ObjectId(req.session.groupId);
    if (groupId) {

        var pollTopic = req.body.pollTopic;
        var days = Number(req.body.timeDays);
        var hours = Number(req.body.timeHours);

        if (isNaN(days) || isNaN(hours)) {
            res.send({redirect: '/'});
        }

        Group.findById(groupId, function (error, group) {
            if (error) {
                res.send({redirect: '/'});
            }
            if (!group) {
                res.send({redirect: '/'});
            }
            console.log("Found the group");

            var notVoted = group.groupMembers;
            var time = (days*24*60*60*1000) + (hours * 60 * 60 * 1000);

            var createdAt = new Date();

            var newPoll = new Poll({
                groupId : groupId,

                pollTopic : pollTopic,
                inFavor : 0,
                opposed : 0,
                notVoted : notVoted,
                ongoing : true,

                submittedAt : createdAt,
                stipulatedTime : time,

                voters : [],
                result : "Pending"
            });

            newPoll.save(function (saveError) {
               if (saveError){
                   res.send({redirect : '/'});
               }
               console.log("Successfully saved the poll");
               res.send({redirect : '/group/' + req.session.groupId});
            });
        });
    }
});

module.exports = router;