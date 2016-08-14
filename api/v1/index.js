var express = require('express')

var api = express.Router()

var login = require('./login')

api.get("/login", login())
api.get("/signup", signup())

module.exports = api