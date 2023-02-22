const logger = require("./logger");

const getToday = () => { 
  let today;
  let newDate = new Date()
  newDate = newDate
    .toISOString()
    .substring(0, 10)

  today = newDate
  // today = '2023/02/28'// type specific date for testing
  logger.info(`${__dirname} ${getToday.name} 200`)
  return today
};

const sendEmail = (friendEmail, firstName) => {
  logger.info('\n' + 'To: ' + friendEmail + '\n' + 
  'Subject: Happy Birthday!' + '\n' +
  'Happy Birthday dear ' + firstName)
  logger.info(`${__dirname} ${sendEmail.name} 200`)
};

const getIsItSkipYear = () => {
  let year = new Date().getFullYear()
  // year = 2000; // type specific date for testing
  let test = year/4 - Math.floor(year/4)
  if (test === 0) {
    logger.info(`${__dirname} ${getIsItSkipYear.name} 200`)
    return true
  } 
  else {
    logger.info(`${__dirname} ${getIsItSkipYear.name} 200`)
    return false
  }
};

const getIsEmptyObjectKeyValue = (obj) => {
  let i = 1
  for (let [key, value] of Object.entries(obj)) {
    if (value.length !== 0 && Object.keys(obj).length === 4) {
      i++
      if (i === 4) {
        logger.info(`${__dirname} ${getIsEmptyObjectKeyValue.name} 200`)
      }
    } else {
      logger.info(`${__dirname} ${getIsEmptyObjectKeyValue.name} 200`)
      return true
    }
  }
  return false
};

const getIsEmptyObject= (obj) => {
  logger.info(`${__dirname} ${getIsEmptyObject.name} 200`)
  return Object.keys(obj).length === 0
};


module.exports = {
  getToday,
  sendEmail,
  getIsItSkipYear,
  getIsEmptyObjectKeyValue,
  getIsEmptyObject
};
