var express = require('express');
var router = express.Router();
let NewPlanDB = global.sqldb.NewPlan;
var superagent = require('superagent');

router.get("/:schoolId/:provId", function (req, res) {

    var schoolId = parseInt(req.params.schoolId);
    var provId = parseInt(req.params.provId);


    let _res = res
    let url = "https://www.youzy.cn/college/" + schoolId + "/newplan.html"
    superagent.get(url)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Cookie', 'Youzy.CurrentVersion=%7b%22Name%22%3a%22%e6%b1%9f%e8%8b%8f%22%2c%22EnName%22%3a%22js%22%2c%22ProvinceId%22%3a' +
            provId + '%2c%22Domain%22%3a%22http%3a%2f%2fjs.youzy.cn%22%2c%22Description%22%3a%22%22%2c%22QQGroup%22%3a%22427569031%22%2c%22QQGroupUrl%22%3anull%2c%22IsOpen%22%3atrue%2c%22Sort%22%3a1%2c%22Province%22%3a%7b%22Name%22%3a%22%e6%b1%9f%e8%8b%8f%22%2c%22Id%22%3a1%7d%2c%22Id%22%3a1%7d; SERVER_ID=de45f6c7-2cb4728a; Uzy.AUTH=6140EBB07802856FAAD96C4D849619BEDC10F6529BFC39DB4C470CEB6E66CF7EDD047337626249E875422A4C4A90ACA65115F51368E2AB2AEA26985A33FD014971949DD710DBA3EE2CB44C141D08ABA27798378A2616094017E8EBA8DE2920C02422B80BD37266268D8D946B2C066739C482D61A13BF240FAE81598431C55653')
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

    // var user_name = req.body.user;
    // var password = req.body.password;


    //  NewPlanDB.findOne({
    //     where: {
    //         schoolId: schoolId,
    //         provId: provId
    //     },
    //     limit: 4
    // }).then(function (result) {
    //     res.status(200)
    //     res.send(result.htmlData)
    // }).catch(function (err) {
    //     console.log("发生错误：" + err);
    // });

    // res.status(200);
    // res.json({
    //     info: "a POST request? nice"
    // });
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
