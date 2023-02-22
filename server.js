const express = require('express');
const logger = require('./src/utils/logger');

const app = express();
const PORT = process.env.PORT || 4001

app.use((req, res, next) => {
  logger.info(`Request to: ${req.method} ${req.path}`)
  next()
});

const ttestRouter = require('./routes/ttest');
app.use('/ttest', ttestRouter);

const friendsRouter = require('./routes/ttest-friends');
app.use('/ttest/friends', friendsRouter);

const wishRouter = require('./routes/ttest-wish');
app.use('/ttest/wish', wishRouter);

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500
  }
  logger.error(`${req.method} ${req.path} ${err.message}`)
  res.status(err.status).send(err.message)
  next()
})

app.listen(PORT, () => {
  logger.info(`Listening ${PORT}`)
});