var express = require('express');
var router = express.Router();
var superagent = require('superagent');

// let provArray = [834, 844, 19340, 845, 860, 851, 852, 856, 853, 1128, 848, 841, 849, 850, 840,
//     1, 846, 839, 838, 862, 861, 847, 837, 859, 842, 855, 835, 858, 16733, 1120, 857, 843, 854];

let provList = [
    {
        name: '北京',
        value: 834
    },
    {
        name: '安徽',
        value: 844
    },
    {
        name: '澳门',
        value: 19340
    },
    {
        name: '福建',
        value: 845
    },
    {
        name: '甘肃',
        value: 860
    },
    {
        name: '广东',
        value: 851
    },
    {
        name: '广西',
        value: 852
    },
    {
        name: '贵州',
        value: 856
    },
    {
        name: '海南',
        value: 853
    },
    {
        name: '河北',
        value: 1128
    },
    {
        name: '河南',
        value: 848
    },
    {
        name: '黑龙江',
        value: 841
    },
    {
        name: '湖北',
        value: 849
    },
    {
        name: '湖南',
        value: 850
    },
    {
        name: '吉林',
        value: 840
    },
    {
        name: '江苏',
        value: 1
    },
    {
        name: '江西',
        value: 846
    },
    {
        name: '辽宁',
        value: 839
    },
    {
        name: '内蒙古',
        value: 838
    },
    {
        name: '宁夏',
        value: 862
    },
    {
        name: '青海',
        value: 861
    },
    {
        name: '山东',
        value: 847
    },
    {
        name: '山西',
        value: 837
    },
    {
        name: '陕西',
        value: 859
    },
    {
        name: '上海',
        value: 842
    },
    {
        name: '四川',
        value: 855
    },
    {
        name: '天津',
        value: 835
    },
    {
        name: '西藏',
        value: 858
    },
    {
        name: '香港',
        value: 16733
    },
    {
        name: '新疆',
        value: 1120
    },
    {
        name: '云南',
        value: 857
    },
    {
        name: '浙江',
        value: 843
    },
    {
        name: '重庆',
        value: 854
    }
];

let schoolList = []


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
                    // page: i
                },
                // offset: 10 * (i - 1),
                // limit: 20
            }).catch(function (err) {
                console.log("发生错误：" + err);
            });
        })

        console.log(result.rows[0])


        for (let i = 0; i < result.rows.length; i++) {
            let cfHtml = {
                schoolId: null,
                schoolName: null,
                provId: null,
                provName: null,
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

                var result2 = await sqldb.NewPlan.create(cfHtml).catch(function (err) {
                    console.log("发生错误：" + err);
                });
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
            return sqldb.NewPlan.findAndCountAll({
                where: {
                    isHave: 5,
                    // id: 13,
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


            let thisIsHave = result.rows[i].isHave


            let url = "https://www.youzy.cn/college/" + schoolId + "/newplan.html"

            superagent.get(url)
                .set('Content-Type', 'application/json;charset=UTF-8')
                .set('Cookie', 'Youzy.CurrentVersion=%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22EnName%22%3a%22hubei%22%2c%22ProvinceId%22%3a'+
                    provId+'%2c%22Domain%22%3a%22http%3a%2f%2fhubei.youzy.cn%22%2c%22Description%22%3a%22%22%2c%22QQGroup%22%3a%22428487411%22%2c%22QQGroupUrl%22%3anull%2c%22IsOpen%22%3atrue%2c%22Sort%22%3a12%2c%22Province%22%3a%7b%22Name%22%3a%22%e6%b9%96%e5%8c%97%22%2c%22Id%22%3a849%7d%2c%22Id%22%3a11%7d; SERVER_ID=de45f6c7-2cb4728a; Youzy.FirstSelectVersion=1; Uzy.AUTH=D5A924865B70BDF9D0141611EFD5D68C24330525A43EF3064698845DB513AB8B69E8B03EC87027D89A8B306347B20FCA23EB6495AD5B40E07B0798181C3A9E55E1B679394E95DF6960DCF323217B186BC0F5C4748FF2444E9AA53F72EFEEA7654900FEDCC5A83F11729191C755123630D7ABE44BB7C6F1228817722C8A31B2CC')
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
                        let notLogin = $(".novip")
                        // 有table，有数据 isHave为4
                        if (pdfList.length > 0) {


                            sqldb.NewPlan.update({
                                isHave: 4,
                                isChecked: 1,
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
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   有数据，isHave重置为4');
                            }).catch(function (err) {
                                urlCount = urlCount + 1
                                console.log("数据库超时" + urlCount)
                                if (urlCount == 4) {

                                    loadHtml()
                                }
                            });

                        }
                        //有table，无数据 isHave为10
                        else if (pdfList.length <= 0 && wrongArea.length > 0 && notFound.length <= 0 && haveGhost.length <= 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.NewPlan.update({
                                isHave: 100,
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
                                console.log(url + "   " + provId)
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
                        //404，跳转到主页 香港 西藏 澳门  isHave为20
                        else if (pdfList.length <= 0 && wrongArea.length <= 0 && notFound.length > 0 && haveGhost.length <= 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.NewPlan.update({
                                isHave: 200,
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
                                console.log(url + "   " + provId)
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
                        //湖北省，因数据整理，系统正在维护中 isHave为30
                        else if (pdfList.length <= 0 && notFound.length <= 0 && wrongArea.length <= 0 && haveGhost.length > 0 && notLogin.length <= 0) {// 写入文件

                            sqldb.NewPlan.update({
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
                                console.log("id为   " + dataFromId + "urlCount为   " + urlCount + '   不存在，isHave重置为300');
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

                            sqldb.NewPlan.update({
                                isHave: 50,
                            }, {
                                where: {
                                    id: dataFromId
                                }
                            }).then(function (result) {


                                urlCount++
                                if (urlCount == 4) {
                                    loadHtml();
                                }
                                console.log(url + "   " + provId)
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


