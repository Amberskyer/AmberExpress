var express = require('express');
var router = express.Router();
let UserDB = global.sqldb.User;
var superagent = require('superagent');

router.get("/:schoolId/:provId/:typeId/:year", function (req, res) {

    var schoolId = parseInt(req.params.schoolId);
    var provId = parseInt(req.params.provId);
    var typeId = parseInt(req.params.typeId);
    var year = parseInt(req.params.year);

    let _res = res
    let url = "https://www.youzy.cn/colleges/PFractionV2.aspx?Id=" + schoolId + "&courseType=" + typeId + "&uCodeIdOrNum=" + provId + "_" + schoolId + "_7_1&year=" + year
    superagent.get(url)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Cookie', 'sion=%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22EnName%22%3a%22hubei%22%2c%22ProvinceId%22%3a849%2c%22Domain%22%3a%22http%3a%2f%2fhubei.youzy.cn%22%2c%22Description%22%3a%22%22%2c%22QQGroup%22%3a%22428487411%22%2c%22QQGroupUrl%22%3anull%2c%22IsOpen%22%3atrue%2c%22Sort%22%3a12%2c%22Province%22%3a%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22Id%22%3a849%7d%2c%22Id%22%3a11%7d; SERVER_ID=de45f6c7-fdfa7b65; Uzy.AUTH=BD482217F9BE650E7661B0E2FAE4C7926700A5939D039D9B90911015111573378B5E10113400C70F14124EA05D599DBA304DF95FA2E2CB4BA9FF11D296C14690F93479D8FA11B6EDEC73C1BA28B0607CFC77C12059B5D07D9DB011791C1DD9CE20F03F745AFCC889CD71CE5106BCC9405E95292C458F19E72AA7A7D36126C27A')
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
