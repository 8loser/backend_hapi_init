'use strict';

module.exports = (sequelize, type) => {
  return sequelize.define('food', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      sun: type.STRING,
      mon: type.STRING,
      tue: type.STRING,
      wed: type.STRING,
      thu: type.STRING,
      fri: type.STRING,
      sat: type.STRING,
      type: type.STRING,
      michelin: type.STRING,
      parking: type.STRING,
      delivery: type.STRING,
      deposit: type.STRING,
      review: type.DOUBLE,
      location: type.STRING
  })
}
