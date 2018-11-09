'use strict'
/** 数据库 **/
// 引入模块
const Sequelize = require('sequelize');
// 读取配置
const mysqlConfig = require('../configs/mysql-config');
const youzyConfig = mysqlConfig.youzy
// 根据配置实例化seq
var db = {
    youzy: new Sequelize(youzyConfig.dbname, youzyConfig.uname, youzyConfig.upwd, {
        host: youzyConfig.host,
        port: youzyConfig.port,
        dialect: youzyConfig.dialect,
        pool: youzyConfig.pool,
    })
};
//用户数据库
db.User = db.youzy.import('../model/user.js');
db.NewPlan = db.youzy.import('../model/newplan.js');
db.School = db.youzy.import('../model/school.js');
db.PFractionData = db.youzy.import('../model/pfractionData.js');


module.exports = db;