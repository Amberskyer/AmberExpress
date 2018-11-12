var express = require("express");
var api = express.Router();

var user = require("./v1/user.js");
var newPlan = require("./v1/newPlan.js");


api.use("/newPlan", newPlan);


module.exports = api;