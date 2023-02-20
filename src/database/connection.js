const Sequelize = require('sequelize');

const sequlize = new Sequelize('ttest_v3_development', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
})

module.exports = sequlize;