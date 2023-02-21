const express = require('express');
const logger = require('../src/utils/logger');
const {getToday} = require('../src/utils/support_functions');

ttestRouter = express.Router();

// GET initial response
ttestRouter.get('/', (req, res, next) => {
  const today = getToday();
  const path = '/'
  if (req.path === path) {
    logger.info('200')
    res.status(200).send(`ttest_v3 \n Today is: ${today}`)
  }
  else {
    logger.info('404')
    res.status(404).send()
  }
  next()
});

module.exports = ttestRouter;