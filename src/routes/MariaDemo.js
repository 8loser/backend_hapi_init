/**
 * MariaDB資料庫查詢
 */
const Controller = require('../controllers/MariaDemo');

/**
 * 路徑設置
 */
const route = [
    {
        method: 'GET',
        path: '/MariaDemo',
        handler: Controller.list
    }, {
        method: 'GET',
        path: '/MariaDemo/{id}',
        handler: Controller.get
    }, {
        method: 'POST',
        path: '/MariaDemo',
        handler: Controller.create
    },
    {
        method: 'PUT',
        path: '/MariaDemo/{id}',
        handler: Controller.update
    },
    {
        method: 'DELETE',
        path: '/MariaDemo/{id}',
        handler: Controller.remove
    }
]

module.exports = route;