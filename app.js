var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//数据库连接
global.sqldb = require('./sqldb');
sqldb.youzy.sync({force: false}).then(function () {
    console.log("Server successed to start");
}).catch(function (err) {
    console.log("Server failed to start due to error: %s", err);
});


/**
 * session配置
 */
var session = require('express-session');

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

app.use(function (req, res, next) {
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if (err) {
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
    }
    next();  //中间件传递
});

//api文件
var apiVersion1 = require("./api/api1.js");
var apiVersion2 = require("./api/api2.js");

app.use("/api/v1", apiVersion1);
app.use("/api//v2", apiVersion2);

/**
 * 路由配置
 */
var routes = require('./routes/routes');

app.use('/', routes); // 即为为路径 /login 设置路由

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
