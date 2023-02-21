const logger = require("./logger");

const getToday = () => { 
  let today;
  let newDate = new Date()
  newDate = newDate
    .toISOString()
    .substring(0, 10)

  today = newDate
  // today = '2023/02/28'// type specific date for testing
  return today
};

const sendEmail = (friendEmail, firstName) => {
  logger.info('\n' + 'To: ' + friendEmail + '\n' + 
  'Subject: Happy Birthday!' + '\n' +
  'Happy Birthday dear ' + firstName)
};

const getIsItSkipYear = () => {
  let year = new Date().getFullYear()
  // year = 2000; // type specific date for testing
  let test = year/4 - Math.floor(year/4)
  if (test === 0) {
    return true
  } 
  else {
    return false
  }
};

// const getIsEmptyArray = (obj) => {
//   return JSON.stringify(obj) === '[]'
// };

const getIsEmptyObject= (obj) => {
  return Object.keys(obj).length === 0
};


module.exports = {
  getToday,
  sendEmail,
  getIsItSkipYear,
  // getIsEmptyArray,
  getIsEmptyObject
};
