'use strict';

// 連接MariaDB用

// 載入全域設定檔 .env
require('dotenv').config()
const Sequelize = require('sequelize')
const ModelRestaurant = require('../models/MariaDemo_restaurant')
const ModelBussinessHours = require('../models/MariaDemo_bussiness_hours')

const sequelize = new Sequelize(process.env.MariadbDatabase, process.env.MariadbUser, process.env.MariadbPassword, {
  host: process.env.MariadbHost,
  dialect: 'mariadb',
  define:{
    // 建表、查詢不包含 createdAt、updatedAt 時戳
    timestamps: false
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// 連接檢查
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Restaurant = ModelRestaurant(sequelize, Sequelize)
const BussinessHours = ModelBussinessHours(sequelize, Sequelize)
module.exports = {
  Restaurant, BussinessHours
}