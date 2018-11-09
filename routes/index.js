// var express = require('express');
// var router = express.Router();
// var superagent = require('superagent');
//
// /** 数据库 **/
// // 引入模块
// const Sequelize = require('sequelize');
// // 读取配置
// const mysqlConfig = require('../configs/mysql-config');
// // 根据配置实例化seq
// var seq = new Sequelize(mysqlConfig.dbname, mysqlConfig.uname, mysqlConfig.upwd, {
//     host: mysqlConfig.host,
//     port: mysqlConfig.port,
//     dialect: mysqlConfig.dialect,
//     pool: mysqlConfig.pool,
// });
// //用户数据库
// var User = seq.import('../model/user.js');
//
//
// // /* GET home page. */
// // router.get('/', function (req, res, next) {
// //     res.render('index', {title: 'Express'});
// // });
//
//
// router.get("/", function(req, res) {
//     res.send("you just sent a GET request, friend");
// });
//
// router.post("/", function(req, res) {
//     res.send("a POST request? nice");
// });
//
// router.put("/", function(req, res) {
//     res.send("i don't see a lot of PUT requests anymore");
// });
//
// router.delete("/", function(req, res) {
//     res.send("oh my, a DELETE??");
// });
//
// module.exports = router;
