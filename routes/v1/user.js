var express = require('express');
var router = express.Router();
var sqldb = require('../../sqldb');
var superagent = require('superagent');

router.get("/list/:schoolId/:provId", function (req, res) {

    var schoolId = parseInt(req.params.schoolId);
    var provId = parseInt(req.params.provId);

    let _res = res

    let url = "https://www.youzy.cn/college/" + schoolId + "/newplan.html"

    superagent.get(url)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Cookie', 'SERVER_ID=de45f6c7-fdfa7b65; Youzy.CurrentVersion=%7b%22Name%22%3a%22%e6%b5%99%e6%b1%9f%22%2c%22EnName%22%3a%22zj%22%2c%22ProvinceId%22%3a'+
            provId+'%2c%22Domain%22%3a%22http%3a%2f%2fzj.youzy.cn%22%2c%22Description%22%3a%22%22%2c%22QQGroup%22%3a%22428396016%22%2c%22QQGroupUrl%22%3anull%2c%22IsOpen%22%3atrue%2c%22Sort%22%3a3%2c%22Province%22%3a%7b%22Name%22%3a%22%e6%b5%99%e6%b1%9f%22%2c%22Id%22%3a843%7d%2c%22Id%22%3a2%7d; Youzy.FirstSelectVersion=1; Uzy.AUTH=C0AAC574BB5CE7F39062707F27E9CF5B1FCF4D0801C64876801D112DEF272464AA421D8FF992111C4A9E433A09CFCC714587A1C31A0CC80B624FE0F72C3078EAFF59D4A228B33738ACFBDD3545F795E4720B34617A554EB19332DF458841FE69EDC28A1714C9CC6AAB938F1E2309966AB9E8C8BDB16E510E40F29BBC94C27669')
        .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .then(function (res) {
            _res.send(res.text)
        })
        .catch(function (err) {
            console.log("异常" + err)
        })

});

router.post("/", function (req, res) {
    var user_name = req.body.user;
    var password = req.body.password;
    res.status(200);
    res.json({
        info: "a POST request? nice"
    });
});

router.get("/:id", function (req, res) {
    var id = parseInt(req.params.id);
    res.status(200).json({
        info: "V1V1   :you just sent a GET request, friend" + id
    });
});

router.put("/:id", function (req, res) {
    res.status(200).json({
        info: "i don't see a lot of PUT requests anymore"
    });
});

router.delete("/:id", function (req, res) {
    res.status(200).json({
        info: "oh my, a DELETE??"
    });
});

module.exports = router;
