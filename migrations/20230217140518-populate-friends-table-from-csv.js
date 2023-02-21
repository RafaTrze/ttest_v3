'use strict';
const logger = require('../src/utils/logger')
const Friend = require('../src/models/friend_model');
const {getFriendsCSV} = require('../src/utils/fs_functions');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const friends = await getFriendsCSV();

    friends.forEach((element) => {
      element.date_of_birth = element.date_of_birth.replace('/', '-')
      element.date_of_birth = element.date_of_birth.replace('/', '-') 
      
      logger.info(element)    

      Friend.create({
        last_name: element.last_name, 
        first_name: element.first_name, 
        date_of_birth: element.date_of_birth, 
        email: element.email
      })
    })
  },

  async down (queryInterface, Sequelize) {
    const friends = await getFriendsCSV()

    friends.forEach((element) => {
      
      logger.info(element)

      Friend.destroy({
        where: {
          email: element.email
        }
      })
    })
  }
};
