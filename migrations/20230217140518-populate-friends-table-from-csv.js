'use strict';
const logger = require('../src/utils/logger')
const Friend = require('../src/models/friend_model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const {getFriendsCSV} = require('../src/utils/fs_functions');
    const friends = await getFriendsCSV();
    const Friend = require('../src/models/friend_model')
    
    friends.forEach((element) => {
      element.date_of_birth = element.date_of_birth.replace('/', '-')
      element.date_of_birth = element.date_of_birth.replace('/', '-')
      
      logger.info(element, ' added to the friends table')
      
      Friend.create({
        last_name: element.last_name, 
        first_name: element.first_name, 
        date_of_birth: element.date_of_birth, 
        email: element.email
      })
    })
  },

  async down (queryInterface, Sequelize) {

    Friend.destroy({
      
      where: {
        id: [1, 2, 3, 4]
      }
    })
  }
};
