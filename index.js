'use strict';

const Hapi = require('@hapi/hapi');

// 載入全域設定檔 .env
require('dotenv').config()

// 使用MongoDB資料庫
// 資料庫位址
const MongoDBUrl = process.env.DBUrl;

//路徑讀取routes內檔案
const routes = require('./src/routes');

const init = async () => {

    const server = Hapi.server({
        port: process.env.ServerPort,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();