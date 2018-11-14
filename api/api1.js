var express = require("express");
var api = express.Router();

var user = require("./v1/user.js");
var newPlan = require("./v1/newPlan.js");
var pfraction = require("./v1/pfraction.js");


api.use("/newPlan", newPlan);
api.use("/pfraction", pfraction);


module.exports = api;