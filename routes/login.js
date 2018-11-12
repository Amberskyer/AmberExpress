var express = require('express');
var router = express.Router();

/* GET login page. */
router.route("/").get(function (req, res) {    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("login",
        {
            title: 'User Login',
            message: ''
        });
}).post(function (req, res) {                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    let User = global.sqldb.User;

    let uname = req.body.uname;                //获取post上来的 data数据中 uname的值

    User.findOne({
        'where': {'isHave': uname},
        'limit': 1,
    }).then(function (result) {
        if (result) {
            //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
            req.session.user = result.dataValues.provName;
            res.send(200);
        } else {
            //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.json({
                message: '用户名不存在'
            })
            res.send(404);
        }
    }).catch(function (err) {
        //错误就返回给原post处（login.html) 状态码为500的错误
        res.send(500);
        console.log(err);
    });
});


module.exports = router;