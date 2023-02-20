const logger = require('./logger');
const {getToday, sendEmail, getIsItSkipYear} = require('./support_functions');
const {getBDFriends} = require('./model_functions');


const wishEmail = async () => {
  const today = getToday().substring(5);
  // const today = '09-11'
  const feb28 = '02-28'
  const feb29 = '02-29'
  const option = null
  if (getIsItSkipYear()) {

    const bdFriends = await getBDFriends(today);
    
    bdFriends.forEach((element) => {
      sendEmail(element.email, element.first_name)
    })

  } else {
    if (today === feb28) {
      const bdFriends = await getBDFriends(today, feb29);
      logger.info(bdFriends)
      bdFriends.forEach((element) => {
        sendEmail(element.email, element.first_name)
      })
  
    } else {
      const bdFriends = await getBDFriends(today);
      bdFriends.forEach((element) => {
        sendEmail(element.email, element.first_name)
      })
    }
  }
};

module.exports = {
  wishEmail
};

