var express = require('express');
var router = express.Router();
var superagent = require('superagent');


var sqldb = require('../../sqldb');

//HTML解析库
var cheerio = require('cheerio');


async function initHtml() {
    let urlCount = 0;
    try {

        var result = await sqldb.fakenews.findAndCountAll({
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