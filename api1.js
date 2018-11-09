var express = require("express");
var api = express.Router();

var user = require("./routes/v1/user.js");


api.use("/user", user);


module.exports = api;