var express = require('express');
var router = express.Router();
var superagent = require('superagent');

let provArray = [834, 844, 19340, 845, 460, 851, 852, 856, 853, 1128, 848, 841, 849, 850, 840,
    1, 846, 839, 838, 862, 861, 847, 837, 859, 842, 855, 835, 858, 46733, 1120, 857, 843, 854];

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

let schoolList = []

let urlCount = 0;

var sqldb = require('../../sqldb');


//HTML解析库
var cheerio = require('cheerio');


checkSchoolList()

async function loadSchoolList() {
    try {
        for (let i = 1; i < 144; i++) {
            var url = "https://www.youzy.cn/college/search?page=" + i
            console.log(url)
            var res = await superagent.get(url)
                .set('Content-Type', 'application/json;charset=UTF-8')
                .catch(function (err) {
                    console.log("异常" + err)
                })

            $ = cheerio.load(res.text);
            let schoolItemList = $('.info a')
            for (let j = 0; j < schoolItemList.length; j++) {

                let schoolItem = {
                    name: null,
                    id: null,
                    page: null,
                }
                console.log(schoolItemList[j].children[0].data);
                console.log(schoolItemList[j].attribs.href.split('/')[2]);
                schoolItem.name = schoolItemList[j].children[0].data
                schoolItem.id = schoolItemList[j].attribs.href.split('/')[2]
                schoolItem.page = i
                // schoolList.push(schoolItem)


                var result = await sqldb.youzy.transaction(function (t) {
                    console.log("+++++++++++++++++++");
                    return sqldb.School.create(schoolItem, {
                        transaction: t
                    }).catch(function (err) {
                        console.log("发生错误：" + err);
                    });
                })
            }
        }
    } catch
        (error) {
        console.error(error);
    }
}


async function checkSchoolList() {

    let pages = []

    try {
        for (let i = 1; i < 144; i++) {
            var result = await sqldb.youzy.transaction(function (t) {
                console.log("+++++++++++++++++++");
                return sqldb.School.findAndCountAll({
                    where: {
                        page: i
                    },
                    // offset: 10 * (i - 1),
                    limit: 20
                }, {
                    transaction: t
                }).catch(function (err) {
                    console.log("发生错误：" + err);
                });
            })
            console.log(result.count)

            if (result.rows.length != 20) {
                pages.push("第" + i + "页数量为" + result.rows.length)
                console.log(pages)
            }

        }
        // let buffer = new Buffer(schoolList);
        // fs.appendFile('../data/schoolList.json',  JSON.stringify(schoolList), function (err) {
        //     if (err) throw err;
        //     console.log('has finished');
        // });
    } catch
        (error) {
        console.error(error);
    }
}




