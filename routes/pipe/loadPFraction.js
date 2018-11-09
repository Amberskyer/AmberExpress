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


initHtml()


async function initHtml() {


    sqldb.PFractionData.findAndCountAll({
        'where': {
            'dataFromId': 4
        },
        'limit': 1
    })


    try {

        var result = await sqldb.User.findAndCountAll({
            'where': {
                'isHave': 4
            },
            'limit': 1
        })

        for (let i = 0; i < result.rows.length; i++) {

            $ = cheerio.load(result.rows[i].htmlData);
            var tableDataList = []
            $('table td').each(function (i, item) {
                tableDataList.push($(this).text().replace(/[\r\n]/g, "").trim())
            })

            let pfList = []
            let dataFromId = result.rows[i].id

            for (let j = 0; j < tableDataList.length / 9; j++) {

                let dataCount = j + 1

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

                let pfItem = {
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

                    dataCount: dataCount,
                    dataFromId: dataFromId,

                }

                pfList.push(pfItem)

            }


            sqldb.youzy.transaction(function (t) {
                return sqldb.PFractionData.bulkCreate(
                    pfList, {
                        transaction: t
                    }).then(result => {
                    console.log("成功创建")
                    console.log(result)
                })
            }).then(result => {
                // Transaction 会自动提交
                // result 是事务回调中使用promise链中执行结果
                // console.log(result.length)
                sqldb.User.update({
                    isHave: 6,
                }, {
                    where: {
                        id: dataFromId
                    }
                }).then(result => {
                    console.log("成功创建")
                    console.log(result)
                })

                initHtml()
                console.log("ok")
            })

        }


    } catch (error) {
        // urlCount++
        // if (urlCount == 10) {
        //     initHtml()
        // }
        initHtml()
        console.log("发生错误：" + error);
    }
}