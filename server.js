const express = require('express');
const Friend = require('./src/models/friend_model');
const logger = require('./src/utils/logger');
const {wishEmail} = require('./src/utils/service')

const app = express();
const PORT = process.env.PORT || 4001

app.get('/', (req, res, next) => {
  const path = '/'
  if (req.path === path) {
    res.status(200).send('ttest_v3')
    logger.info('/ 200')
  }
  else {
    res.status(404).send()
    logger.info('/ 404')
  }
  next()
});

app.get('/friends', async (req, res, next) => {
  const friends = await Friend.findAll();
  if (friends) {
    logger.info('/friends 200')
    res.status(200).send(friends)
  } else {
    logger.info('/friends 404')
    res.status(404).send()
  }
  next()
});

app.get('/wish', (req, res, next) => {
  const email = 'email'
  const sms = 'sms'
  if (req.query.service === email) {
    logger.info('/wish 200')
    wishEmail()
    res.status(200).send('200')
  }
  else if (req.query.service === sms) {
    logger.info('/wish 200')
    wishEmail()
    res.status(200).send('200')
  }
  else {
    logger.info('/wish 404')
    res.status(404).send('404')
  }
  next()
});

app.post('/friends', (req, res, next) => {
  const newFriend = req.query
  logger.info(newFriend)
  // logger.info(Object.values(newFriend))
  // logger.info(typeof Object.values(newFriend)[1]
  
  if (newFriend.last_name && newFriend.first_name && newFriend.date_of_birth && newFriend.email) {
    Friend.create({
      last_name: newFriend.last_name, 
      first_name: newFriend.first_name, 
      date_of_birth: newFriend.date_of_birth, 
      email: newFriend.email
    })
    logger.info('/friends 200')
    res.status(200).send('200')

  } else {
    logger.info('/friends 400')
    res.status(400).send('400')
  }
  next()
});

app.put('/friends/:id', async (req, res, next) => {
  const updateFriend = req.query
  const id = req.params.id
  logger.info(updateFriend)
  logger.info(id)
  if (updateFriend.last_name && updateFriend.first_name && updateFriend.date_of_birth && updateFriend.email) {
    Friend.update({
      last_name: updateFriend.last_name, 
      first_name: updateFriend.first_name, 
      date_of_birth: updateFriend.date_of_birth, 
      email: updateFriend.email
    }, 
    {
      where: {
        id: id
      }
    })
    logger.info('/friends/:id 200')
    res.status(200).send('200')
  }
  else {
    logger.info('/friends/:id 400')
    res.status(400).send('400')
  }
  next()
});

app.delete('/friends/:id', async (req, res, next) => {
  const id = req.params.id
  if (id) {
    Friend.destroy({
      where: {
        id: id
      }
    })
    logger.info('/friends/:id 204')
    res.status(204).send('204')
  }
  else {
    logger.info('/friends/:id 404')
    res.status(404).send('404')
  }
  next()
});

app.listen(PORT, () => {
  logger.info(`Listening ${PORT}`)
});