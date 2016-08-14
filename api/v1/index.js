var express = require('express')

var api = express.Router()

var login = require('./login')

api.get("/login", function(req, res){
	console.log("Got GET Request on login")
	login(req, res)
})
// api.get("/signup", function(req, res){
// 	signup(req, res)
// })

module.exports = api