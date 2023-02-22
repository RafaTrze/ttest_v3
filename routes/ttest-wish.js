const express = require('express');
const logger = require('../src/utils/logger');

const {wishEmail} = require('../src/utils/service')

wishRouter = express.Router();

// GET send hb wishes
wishRouter.get('/', (req, res, next) => {
  const email = 'email'
  const sms = 'sms'

  if (req.query.service === email) {
    wishEmail()
    logger.info(`${req.method} 200`)
    res.status(200).send('200')

  }
  else if (req.query.service === sms) {
    wishEmail()
    logger.info(`${req.method} ${req.path} 200`)
    res.status(200).send('200')

  }
  else {
    const error = new Error('404')
    error.status = 404;
    return next(error, req)
  }
  next()
});

module.exports = wishRouter;