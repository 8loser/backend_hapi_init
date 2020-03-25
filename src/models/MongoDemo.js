'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Model = new Schema({
  // name: { type: String, required: true, index: { unique: true } },
  // type: { type: String, required: true }
});

// module.exports = mongoose.model('Demo', Model, Collection名稱); 
module.exports = mongoose.model('Demo', Model, 'food'); 
