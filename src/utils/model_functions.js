const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const logger = require('./logger');
const Friend = require('../models/friend_model');

const getBDFriends = async (today_date, option_date) => {
  const bdFriends = await Friend.findAll({
    where: {
      date_of_birth: {
        [Op.or]: [
          {[Op.substring]: today_date},
          {[Op.substring]: option_date}
        ]
      }
    }
  })
  return bdFriends

};

module.exports = {getBDFriends};