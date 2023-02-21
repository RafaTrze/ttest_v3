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
    logger.info('200')
    res.status(200).send('200')
  }
  else if (req.query.service === sms) {
    wishEmail()
    logger.info('200')
    res.status(200).send('200')
  }
  else {
    logger.info('404')
    res.status(404).send('404')
  }
  next()
});

module.exports = wishRouter;