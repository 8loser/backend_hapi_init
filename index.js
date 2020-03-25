'use strict';

const Hapi = require('@hapi/hapi');

//載入全域設定檔 .env
require('dotenv').config()

//資料庫位址
const MongoDBUrl = process.env.DBUrl;

const init = async () => {

    const server = Hapi.server({
        port: process.env.SrvPort,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

//載入所有route
const routes = require('./src/routes');

init();