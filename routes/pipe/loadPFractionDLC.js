var express = require('express');
var router = express.Router();
var superagent = require('superagent');

let provList = [
    {
        name: '安徽',
        value: 34
    },
    {
        name: '北京',
        value: 11
    },
    {
        name: '重庆',
        value: 50
    },
    {
        name: '福建',
        value: 35
    },
    {
        name: '甘肃',
        value: 62
    },
    {
        name: '贵州',
        value: 52
    },
    {
        name: '广东',
        value: 44
    },
    {
        name: '广西',
        value: 45
    },
    {
        name: '湖北',
        value: 42
    },
    {
        name: '海南',
        value: 46
    },
    {
        name: '黑龙江',
        value: 23
    },
    {
        name: '湖南',
        value: 43
    },
    {
        name: '河南',
        value: 41
    },
    {
        name: '河北',
        value: 13
    },
    {
        name: '吉林',
        value: 22
    },
    {
        name: '江西',
        value: 36
    },
    {
        name: '江苏',
        value: 32
    },
    {
        name: '辽宁',
        value: 21
    },
    {
        name: '宁夏',
        value: 64
    },
    {
        name: '内蒙古',
        value: 15
    },
    {
        name: '青海',
        value: 63
    },
    {
        name: '山西',
        value: 14
    },
    {
        name: '山东',
        value: 37
    },
    {
        name: '陕西',
        value: 61
    },
    {
        name: '四川',
        value: 51
    },
    {
        name: '上海',
        value: 31
    },
    {
        name: '天津',
        value: 12
    },
    {
        name: '西藏',
        value: 54
    },
    {
        name: '新疆',
        value: 65
    },
    {
        name: '云南',
        value: 53
    },
    {
        name: '浙江',
        value: 33
    }
];

let yearList = [2012, 2013, 2014, 2015, 2016, 2017]
let typeList = [0, 1]


var sqldb = require('../../sqldb');


//HTML解析库
var cheerio = require('cheerio');

loadHtml()

async function formatDataBase() {
    try {

        var result = await sqldb.youzy.transaction(function (t) {
            console.log("+++++++++++++++++++");
            return sqldb.School.findAndCountAll({

                where: {
                    isHave: 0
                },
                // offset: 10 * (i - 1),
                limit: 1
            }).catch(function (err) {
                console.log("发生错误：" + err);
            });
        })

        console.log(result.rows[0])


        for (let i = 0; i < result.rows.length; i++) {
            let pfList = []
            let dataFromId = result.rows[i].id

            let cfHtml = {
                schoolId: null,
                schoolName: null,
                provId: null,
                provName: null,
                typeId: null,
                year: null,
                isHave: 0,
                htmlData: 0,
                isChecked: null,
            }

            cfHtml.schoolName = result.rows[i].name
            cfHtml.schoolId = result.rows[i].id

            for (let j = 0; j < provList.length; j++) {

                cfHtml.provName = provList[j].name
                cfHtml.provId = provList[j].value

                // console.log(cfHtml)

                for (let k = 0; k < typeList.length; k++) {

                    cfHtml.typeId = typeList[k]

                    for (let l = 0; l < yearList.length; l++) {

                        cfHtml.year = yearList[l]


                        // var result2 = await sqldb.PFractionDLC.create(cfHtml).catch(function (err) {
                        //     console.log("发生错误：" + err);
                        // });

                        sqldb.youzy.transaction(function (t) {
                            return sqldb.PFractionDLC.bulkCreate(
                                pfList, {
                                    transaction: t
                                }).then(result => {
                                console.log("成功创建")
                                // console.log(result)
                            })
                        }).then(result => {
                            // Transaction 会自动提交
                            // result 是事务回调中使用promise链中执行结果
                            // console.log(result.length)
                            sqldb.School.update({
                                isHave: 1,
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(result => {

                                formatDataBase()
                                console.log("更新状态成功")
                            })

                            console.log("事务完成")
                        })
                    }

                }

            }

        }


    } catch (error) {
        console.error(error);
    }
}

async function loadHtml() {
    let urlCount = 0
    try {

        var result = await sqldb.youzy.transaction(function (t) {
            console.log("+++++++++++++++++++");
            return sqldb.PFractionDLC.findAndCountAll({
                where: {
                    isHave: 0
                },
                limit: 4
            }, {
                transaction: t
            }).catch(function (err) {
                loadHtml()
                console.log("发生错误：" + err);
            });
        })

        for (let i = 0; i < result.rows.length; i++) {


            let schoolId = result.rows[i].schoolId
            let provId = result.rows[i].provId
            let year = result.rows[i].year
            let typeId = result.rows[i].typeId


            let url = "https://www.youzy.cn/colleges/PFractionV2.aspx?Id=" + schoolId + "&courseType=" + typeId + "&uCodeIdOrNum=" +
                provId + "_" + schoolId + "_7_1&year=" + year

            superagent.get(url)
                .set('Content-Type', 'application/json;charset=UTF-8')
                .set('Cookie', 'Youzy.FirstSelectVersion=1; Youzy.CurrentVersion=%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22EnName%22%3a%22hubei%22%2c%22ProvinceId%22%3a849%2c%22Domain%22%3a%22http%3a%2f%2fhubei.youzy.cn%22%2c%22Description%22%3a%22%22%2c%22QQGroup%22%3a%22428487411%22%2c%22QQGroupUrl%22%3anull%2c%22IsOpen%22%3atrue%2c%22Sort%22%3a12%2c%22Province%22%3a%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22Id%22%3a849%7d%2c%22Id%22%3a11%7d; SERVER_ID=de45f6c7-fdfa7b65; Uzy.AUTH=BD482217F9BE650E7661B0E2FAE4C7926700A5939D039D9B90911015111573378B5E10113400C70F14124EA05D599DBA304DF95FA2E2CB4BA9FF11D296C14690F93479D8FA11B6EDEC73C1BA28B0607CFC77C12059B5D07D9DB011791C1DD9CE20F03F745AFCC889CD71CE5106BCC9405E95292C458F19E72AA7A7D36126C27A')
                .timeout({
                    response: 5000,  // Wait 5 seconds for the server to start sending,
                    deadline: 60000, // but allow 1 minute for the file to finish loading.
                })
                .then(function (res) {

                    let dataFromId = result.rows[i].id

                    if (res) {
                        $ = cheerio.load(res.text);
                        let pdfList = $('table')
                        let wrongArea = $(".f24")
                        let notFound = $(".index-home-fillin")
                        let haveGhost = $(".bg")
                        let notLogin = $(".novip-colleges-plan")
                        // 有table，有数据
                        if (pdfList.length > 0) {

                            sqldb.PFractionDLC.update({
                                isHave: 4,
                                htmlData: res.text
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {

                                urlCount++
                                if (urlCount == 4) {
                                    ;
                                    loadHtml();
                                }
                                console.log(url)
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   有数据，isHave重置为4');
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {

                                    loadHtml()
                                }
                            });

                        }
                        //有table，无数据
                        else if (pdfList.length <= 0 && wrongArea.length > 0 && notFound.length <= 0 && haveGhost.length <= 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.PFractionDLC.update({
                                isHave: 10,
                                htmlData: res.text
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {


                                urlCount++
                                if (urlCount == 4) {
                                    ;
                                    loadHtml();
                                }
                                console.log(url)
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   无数据，isHave重置为10');
                                // console.log(result);
                                // res.send(result)
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {

                                    loadHtml()
                                }
                            });

                        }
                        //404，跳转到主页
                        else if (pdfList.length <= 0 && wrongArea.length <= 0 && notFound.length > 0 && haveGhost.length <= 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.PFractionDLC.update({
                                isHave: 20,
                                htmlData: "跳转到主页啦啦啦啦"
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {


                                urlCount++
                                if (urlCount == 4) {
                                    ;
                                    loadHtml();
                                }
                                console.log(url)
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   不存在，isHave重置为20');
                                // console.log(result);
                                // res.send(result)
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {

                                    loadHtml()
                                }
                            });

                        }
                        //湖北省，因数据整理，系统正在维护中
                        else if (pdfList.length <= 0 && notFound.length <= 0 && wrongArea.length <= 0 && haveGhost.length > 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.PFractionDLC.update({
                                isHave: 30,
                                htmlData: "因数据整理，系统正在维护中"
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {


                                urlCount++
                                if (urlCount == 4) {
                                    ;
                                    loadHtml();
                                }
                                console.log(url)
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   不存在，isHave重置为30');
                                // console.log(result);
                                // res.send(result)
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {

                                    loadHtml()
                                }
                            });

                        }
                        //未登录
                        else if (pdfList.length <= 0 && notFound.length <= 0 && wrongArea.length <= 0 && haveGhost.length <= 0 && notLogin.length > 0) {
                            urlCount = urlCount + 1
                            console.log("未登录" + urlCount)
                            if (urlCount == 4) {
                                loadHtml()
                            }
                        }
                        //获取但未显示不招生，isHave重置为5
                        else if (pdfList.length <= 0 && notFound.length <= 0 && wrongArea.length <= 0 && haveGhost.length <= 0 && notLogin.length <= 0) {

                            sqldb.PFractionDLC.update({
                                isHave: 5,
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {


                                urlCount++
                                if (urlCount == 4) {
                                    loadHtml();
                                }
                                console.log(url)
                                console.log("学校id为   " + schoolId + "   省份id为   " + provId)
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   获取但未显示不招生，isHave重置为5');
                                // console.log(result);
                                // res.send(result)
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {
                                    loadHtml()
                                }
                            });

                        }
                        else {
                            urlCount = urlCount + 1
                            console.log("未知异常" + urlCount)
                            if (urlCount == 4) {
                                loadHtml()
                            }
                        }
                    }
                })
                .catch(function (err) {
                    console.log("异常" + err)
                    urlCount++
                    if (urlCount == 4) {
                        loadHtml();
                    }
                })


        }


    } catch (error) {
        console.error(error);
    }
}


async function checkHtml() {
    let urlCount = 0;
    try {

        var result = await User.findAndCountAll({
            'where': {
                'isHave': 1
            },
            'limit': 10
        })

        for (let i = 0; i < result.rows.length; i++) {

            let dataFromId = result.rows[i].id

            $ = cheerio.load(result.rows[i].htmlData);

            let pdfList = $('table')
            let wrongArea = $(".f24")

            if (pdfList.length > 0) {
                User.update({
                    isHave: 4,
                }, {
                    where: {
                        id: dataFromId
                    }
                }).then(function (result) {

                    urlCount++
                    if (urlCount == 4) {
                        ;
                        checkHtml();
                    }
                    console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   有数据，isHave重置为4');
                }).catch(function (err) {
                    urlCount = urlCount + 1
                    console.log("数据库超时" + urlCount)
                    if (urlCount == 4) {

                        checkHtml()
                    }
                });

            }
            else if (pdfList.length <= 0 && wrongArea.length > 0) {// 写入文件

                User.update({
                    isHave: 10,
                }, {
                    where: {
                        id: dataFromId
                    }
                }).then(function (result) {


                    urlCount++
                    if (urlCount == 4) {
                        ;
                        checkHtml();
                    }
                    console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   无数据，isHave重置为10');
                    // console.log(result);
                    // res.send(result)
                }).catch(function (err) {
                    urlCount = urlCount + 1
                    console.log("数据库超时" + urlCount)
                    if (urlCount == 4) {

                        checkHtml()
                    }
                });

            }
            else {

                User.update({
                    isHave: 0,
                }, {
                    where: {
                        id: dataFromId
                    }
                }).then(function (result) {


                    urlCount++
                    if (urlCount == 4) {
                        ;
                        checkHtml();
                    }
                    console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   未下载完成，isHave重置为0');
                    // console.log(result);
                    // res.send(result)
                }).catch(function (err) {
                    urlCount = urlCount + 1
                    console.log("数据库超时" + urlCount)
                    if (urlCount == 4) {

                        checkHtml()
                    }
                });

            }
        }


    } catch (error) {
        console.error(error);
    }
}


async function initHtml() {
    let urlCount = 0;
    try {

        var result = await User.findAndCountAll({
            'where': {
                'isHave': 4
            },
            'limit': 10
        })

        for (let i = 0; i < result.rows.length; i++) {

            $ = cheerio.load(result.rows[i].htmlData);
            var tableDataList = []
            $('table td').each(function (i, item) {
                tableDataList.push($(this).text().replace(/[\r\n]/g, "").trim())
            })

            for (let j = 0; j < tableDataList.length; j++) {


                let dataFromId = result.rows[i].id

                let schoolId = result.rows[i].schoolId
                let schoolName = result.rows[i].schoolName
                let provId = result.rows[i].provId
                let provName = result.rows[i].provName
                let typeId = result.rows[i].typeId
                let year = result.rows[i].year

                let code = tableDataList[9 * j + 1]
                let majorName = tableDataList[9 * j + 2]
                let bat = tableDataList[9 * j + 3]
                let max = tableDataList[9 * j + 4]
                let avr = tableDataList[9 * j + 5]
                let min = tableDataList[9 * j + 6]
                let minLevel = tableDataList[9 * j + 7]
                let count = tableDataList[9 * j + 8]

                let results = await ResultData.create({
                    schoolId: schoolId,
                    schoolName: schoolName,
                    provId: provId,
                    provName: provName,
                    typeId: typeId,
                    year: year,
                    code: code,
                    majorName: majorName,
                    bat: bat,
                    max: max,
                    avr: avr,
                    min: min,
                    minLevel: minLevel,
                    count: count,

                    dataFromId: dataFromId,

                })


            }

        }

        initHtml()

    } catch (error) {
        console.error(error);
    }
}


