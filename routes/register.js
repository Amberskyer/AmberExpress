var express = require('express');
var router = express.Router();

/* GET register page. */
router.route("/").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'User register'});
}).post(function(req,res){
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
});



module.exports = router;