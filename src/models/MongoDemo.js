'use strict';

const mongoose = require('mongoose');
// 分頁查詢套件
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Model = new Schema({
  // name: { type: String, required: true, index: { unique: true } },
  // type: { type: String, required: true }
});

// 轉為分頁查詢元件
Model.plugin(mongoosePaginate);

// module.exports = mongoose.model('Demo', Model, Collection名稱); 
module.exports = mongoose.model('Demo', Model, 'restaurant'); 
