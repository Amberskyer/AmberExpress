var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    res.render('index', {title: 'Express'});    // 到达此路径则渲染index文件，并传出title值供 index.html使用
});


let login = require("./login.js");
router.use("/login", login);

let register = require("./register.js");
router.use("/register", register);

/* GET home page. */
router.get("/home", function (req, res) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("home", {title: 'Home'});         //已登录则渲染home页面
});

/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});


module.exports = router;
