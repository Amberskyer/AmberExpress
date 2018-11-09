var express = require('express');
var router = express.Router();
var sqldb = require('../../sqldb');

router.get("/list", function (req, res) {
    return sqldb.youzy.transaction(function (t) {
        console.log("+++++++++++++++++++");
        return sqldb.User.findAndCountAll({
            'where': {
                'isHave': 4
            },
            'limit': 10
        }, {
            transaction: t
        }).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            console.log("发生错误：" + err);
        });
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
