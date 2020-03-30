'use strict';

module.exports = (sequelize, type) => {
  return sequelize.define('business_hours', {
      id: {
        type: type.INTEGER,
        primaryKey: true
      },
      sun_open: type.STRING,
      sun_close: type.STRING,
      mon_open: type.STRING,
      mon_close: type.STRING,
      tue_open: type.STRING,
      tue_close: type.STRING,
      wed_open: type.STRING,
      wed_close: type.STRING,
      thu_open: type.STRING,
      thu_close: type.STRING,
      fri_open: type.STRING,
      fri_close: type.STRING,
      sat_open: type.STRING,
      sat_close: type.STRING
  })
}
