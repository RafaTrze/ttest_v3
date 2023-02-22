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
  logger.info(`${__dirname} ${getBDFriends.name} 200`)
  return bdFriends

};



const getAllFriends = async () => {
  const allFriends = await Friend.findAll();
  logger.info(`${__dirname} ${getAllFriends.name} 200`)
  return allFriends
};

const getFriendById = async (ID) => {
  const friendId = await Friend.findAll({
    where: {
      id: ID
    }
  })
  logger.info(`${__dirname} ${getFriendById.name} 200`)
  return friendId
};

const postFriend = async (last_name, first_name, date_of_birth, email) => {
  await Friend.create({
    last_name: last_name, 
    first_name: first_name, 
    date_of_birth: date_of_birth, 
    email: email
  })
  logger.info(`${__dirname} ${postFriend.name} 200`)
};

const putFriend = async (last_name, first_name, date_of_birth, email, ID) => {
  await Friend.update({
    last_name: last_name, 
    first_name: first_name, 
    date_of_birth: date_of_birth, 
    email: email
  },
  {
    where: {
    id: ID
    }
  })
  logger.info(`${__dirname} ${putFriend.name} 200`)
};

const deleteFriend = async (ID) => {
  await Friend.destroy({
    where: {
      id: ID
    }
  })
  logger.info(`${__dirname} ${deleteFriend.name} 200`)
};

module.exports = {
  getBDFriends,
  getAllFriends,
  putFriend,
  getFriendById,
  postFriend,
  deleteFriend
};