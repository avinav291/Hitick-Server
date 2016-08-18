//
//  api/v1/login.js
//  Hitick-Server
//
//  Created by Avinav Goel on 14/08/16.
//  Copyright © 2016 Avinav Goel. All rights reserved.
//
var express = require('express')
var mongoose = require('mongoose')

var User = require("../../models/User")
var Group = require('../../models/Group')

module.exports = function(req, res){
	User.findOne({mobile : req.query.mobile}, function(err, user){
		if (err) {
			console.log(err)
			res.json({error:"Error at server level:"+err})
			return
		}
		if (!user) {
			//No user with That UserName Exists
			//No content Response code
			console.log("No Existing User")
			res.end(JSON.stringify({error: "No Existing User "}))
			return
		}
		user.checkPassword(req.query.password, function(err, isMatch){
			if(err){
				//Error: Error in matching Password
				console.log(err)
				// res.status(204)
				res.json({error:err})
				return
			}
			if(isMatch){
				//The user is a match return him the values
				// res.status(200)
				console.log("Found A match")
				Group.find({_id : {$in : user.groups}}, function(err, groups){
					if(err){
						//Could not validate Groups
						console.log("Could Not VAlidate Groups:"+err)
						res.status(204)
						res.json({error:"Could not validate Groups" + err})
					}
					console.log("returning Groups")
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
				console.log("Invalid Password")
				res.json({error:"Invalid Password"})
			}
		})

	})
}