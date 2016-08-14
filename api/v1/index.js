//
//  api/v1/index.js
//  Hitick-Server
//
//  Created by Avinav Goel on 13/08/16.
//  Copyright © 2016 Avinav Goel. All rights reserved.
//
var express = require('express')

var api = express.Router()

var login = require('./login')
var signup = require('./signup')
var joinGrp = require('./joinGrp')
var createGrp = require('./createGrp')

api.get("/login", function(req, res){
	console.log("Got GET Request on login")
	login(req, res)
})
api.get("/signup", function(req, res){
	console.log("Got signup Request")
	signup(req, res)
})

api.get("/join", function(req, res){
	console.log("Got Join Request")
	joinGrp(req, res)
})

api.get('/create', function(req, res){
	console.log("Got group create request")
	createGrp(req, res)
})

module.exports = api