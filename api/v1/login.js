var express = require('express')
var mongoose = require('mongoose')

var User = require("../../models/User")
var Group = require('../../models/Group')

module.exports = function(req, res){
	User.findOne(req.body.mobileNumber, function(err, user){
		if (err) {
			console.log(err)
			res.status(404)
			res.json({	error:"Error at server level:"+err})
		}
		if (!user) {
			//No user with That UserName Exists
			//No content Response code
			res.status(204)
			res.json({error:"No Existing User :"+ err})
		}
		user.checkPassword(req.body.password, function(err, isMatch){
			if(err){
				//Error: Error in matching Password
				res.status(204)
				res.json({error:err})
			}
			if(isMatch){
				//The user is a match return him the values
				res.status(200)
				//TODO:- Construct Proper JSON for Sending
				model.find($in:user.groups, function(err, groups){
					if(err){
						//Could not validate Groups
						res.status(204)
						res.json({error:"Could not validate Groups"})
					}
					res.json({
						usename:user.username,
						password:user.password,
						mobile:user.mobile,
						email:user.email,
						groups:groups
					})
				})
			}
			else{
				//Invalid Password
				res.status(204)
				res.json({error:"Invalid Password"})
			}
		})

	})
}