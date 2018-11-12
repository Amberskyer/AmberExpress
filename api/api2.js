var express = require("express");
var api = express.Router();

var user = require("./v2/user.js");

api.use("/user", user);


module.exports = api;