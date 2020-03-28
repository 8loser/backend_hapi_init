'use strict';

const Hapi = require('@hapi/hapi');

// 載入全域設定檔 .env
require('dotenv').config()

// 使用MongoDB資料庫
// 資料庫位址
const mongoose = require('mongoose');
const MongoDBUrl = process.env.MongoDBUrl;

//路徑讀取routes內檔案
const routes = require('./src/routes');

const init = async () => {

    const server = Hapi.server({
        port: process.env.ServerPort,
        host: 'localhost'
    });

    server.route(routes);

    // 啟動服務
    await server.start();
    // 連接mongo資料庫
    const mongoOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    mongoose.connect(MongoDBUrl, mongoOptions).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();