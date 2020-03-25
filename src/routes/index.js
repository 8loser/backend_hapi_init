// 另一種作法
// var BankLink = require('./BankLink');
// var WebCode = require('./WebCode');
// var DEMO = require('./test');
// module.exports = [].concat(BankLink,WebCode,DEMO);


// 一次載入全部routes/*.js檔案的方式
const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(file => {
    routes = routes.concat(require(`./${file}`))
  });

module.exports = routes;