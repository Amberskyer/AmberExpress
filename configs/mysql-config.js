var config = {
    youzy: {
        dbname: 'youzy',
        uname: 'root',
        upwd: '123456',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 20000
        },
        dialectOptions: {
            requestTimeout: 999999,
            // instanceName:'DEV'
        }  //设置MSSQL超时时间
    },

    aya_rei: {
        dbname: 'aya_rei',
        uname: 'root',
        upwd: '123456',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 20000
        },
        dialectOptions: {
            requestTimeout: 999999,
            // instanceName:'DEV'
        }  //设置MSSQL超时时间
    },

    fakenews: {
        dbname: 'fakenews',
        uname: 'root',
        upwd: '123456',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 20000
        },
        dialectOptions: {
            requestTimeout: 999999,
            // instanceName:'DEV'
        }  //设置MSSQL超时时间
    }
}

module.exports = config;