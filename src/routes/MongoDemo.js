/**
 * MongoDemo
 * Mongo資料庫查詢
 */
const Controller = require('../controllers/MongoDemo');

/**
 * 路徑設置
 */
const route = [
    {
        method: 'GET',
        path: '/MongoDemo',
        handler: Controller.list
    }, {
        method: 'GET',
        path: '/MongoDemoGreed',
        handler: Controller.list
    }, {
        method: 'GET',
        path: '/MongoDemo/{id}',
        handler: Controller.get
    }, {
        method: 'POST',
        path: '/MongoDemo',
        handler: Controller.create
    },
    {
        method: 'PUT',
        path: '/MongoDemo/{id}',
        handler: Controller.update
    },
    {
        method: 'DELETE',
        path: '/MongoDemo/{id}',
        handler: Controller.remove
    }
]

module.exports = route;