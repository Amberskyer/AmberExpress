'use strict'
/** 数据库 **/
// 引入模块
const Sequelize = require('sequelize');
// 读取配置
const mysqlConfig = require('../configs/mysql-config');
const youzyConfig = mysqlConfig.youzy
const ayareiConfig = mysqlConfig.aya_rei
const fakenewsConfig = mysqlConfig.fakenews
// 根据配置实例化seq
var db = {
    youzy: new Sequelize(youzyConfig.dbname, youzyConfig.uname, youzyConfig.upwd, {
        host: youzyConfig.host,
        port: youzyConfig.port,
        dialect: youzyConfig.dialect,
        pool: youzyConfig.pool,
    }),

    aya_rei: new Sequelize(ayareiConfig.dbname, ayareiConfig.uname, ayareiConfig.upwd, {
        host: ayareiConfig.host,
        port: ayareiConfig.port,
        dialect: ayareiConfig.dialect,
        pool: ayareiConfig.pool,
    }),

    fakenews: new Sequelize(fakenewsConfig.dbname, fakenewsConfig.uname, fakenewsConfig.upwd, {
        host: fakenewsConfig.host,
        port: fakenewsConfig.port,
        dialect: fakenewsConfig.dialect,
        pool: fakenewsConfig.pool,
    })
};
//用户数据库
db.User = db.youzy.import('../schema/user.js');
db.PFractionDLC = db.youzy.import('../schema/pfractionDLC.js');
db.NewPlan = db.youzy.import('../schema/newplan.js');
db.School = db.youzy.import('../schema/school.js');
db.PFractionData = db.youzy.import('../schema/pfractionData.js');


db.tt = db.fakenews.import('../schema/tt.js');

module.exports = db;