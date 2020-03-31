'use strict';

module.exports = (sequelize, type) => {
  return sequelize.define('restaurant', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING,
      type: type.STRING,
      michelin: type.STRING,
      parking: type.STRING,
      delivery: type.STRING,
      deposit: type.STRING,
      review: type.DOUBLE,
      location: type.GEOMETRY
  })
}
