const express = require('express');
const logger = require('../src/utils/logger');
const {getToday} = require('../src/utils/support_functions');

ttestRouter = express.Router();

// GET initial response
ttestRouter.get('/', (req, res, next) => {
  const today = getToday();
  const path = '/'

  if (req.path === path) {
    logger.info(`${req.method} 204`)
    res.status(200).send(`ttest_v3 \n Today is: ${today}`)

  }
  else {
    const error = new Error('404')
    error.status = 404;
    return next(error, req)
  }
  next()
});

module.exports = ttestRouter;