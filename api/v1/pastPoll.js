//
//  Created by Avinav on 18/08/16
//  Copyright © 2016 Avinav. All rights reserved.
//

var express = require('express')
var mongoose = require('mongoose')

var Group = require('../../models/Group')
var Poll = require('../../models/Poll')

//This Module returns the polls of a group with a particular batch size before the last poll date
module.exports = function(req, res){
    var groupId = mongoose.Schema.Types.objectId(req.query.groupId)

    Group.findOne({_id:groupId}, function(group, err){
        if(err || !group){
            res.json({error:"Could Not find User"})
        }
        var lastPollTime = new Date(req.query.lastTime)
        //Find the polls for that group before the time createdAt

        Poll.find({$and:[{groupId:group._id}, {createdAt:{lt:lastPollTime}}]}).batchSize(req.query.batchSize).exec(function (err, polls) {

            if(err || !polls){
                res.json({error:"Could not fetch Polls"})
            }

            res.json(polls)
        })
    })
}