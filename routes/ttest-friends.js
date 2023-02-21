const express = require('express');

const logger = require('../src/utils/logger');
const {getIsEmptyObject, getToday} = require('../src/utils/support_functions');
const {getAllFriends, getBDFriends, getFriendById, putFriend, postFriend, deleteFriend} = require('../src/utils/model_functions')

friendsRouter = express.Router();

// GET friends
friendsRouter.get('/', async (req, res, next) => { 
  const friends = await getAllFriends();
  const isEmpty = getIsEmptyObject(friends);
  
  if (friends && !isEmpty) {
    logger.info('200')
    res.status(200).send(friends)
  } else if (isEmpty) {
    logger.info('204')
    res.status(204).send()
  }
  else {
    logger.info('404')
    res.status(404).send('404')
  }
  next()
});

// GET birthday friends
friendsRouter.get('/bd', async (req, res, next) => {
  today = getToday().substring(5);
  const bdFriends = await getBDFriends(today);
  const isEmpty = getIsEmptyObject(bdFriends)

  if (bdFriends && !isEmpty) {
    logger.info('200')
    res.status(200).send(bdFriends)
  } else if (isEmpty) {
    logger.info('204')
    res.status(204).send()
  } else {
    logger.info('404')
    res.status(404).send('404')
  }
  next()
});

// GET friend by id
friendsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  logger.info(req.params.id)
  const friendById = await getFriendById(id);
  const isEmpty = getIsEmptyObject(friendById);

  if (!isEmpty) {
    logger.info('200')
    res.status(200).send(friendById)
  }
  else {
    logger.info('404')
    res.status(404).send('404')
  }
  next()
});

// POST friend
friendsRouter.post('/', (req, res, next) => {
  const newFriend = req.query
  
  if (newFriend.last_name && newFriend.first_name && newFriend.date_of_birth && newFriend.email) {
    
    postFriend(newFriend.last_name, newFriend.first_name, newFriend.date_of_birth, newFriend.email)
    logger.info('200')
    res.status(200).send('200')

  } else {
    logger.info('400')
    res.status(400).send('400')
  }
  next()
});

// PUT friend
friendsRouter.put('/:id', async (req, res, next) => {
  const updateFriend = req.query
  const id = req.params.id
  const friendId = await getFriendById(id)
  const isEmpty = getIsEmptyObject(friendId)
  
  // check for empty object and empty keys
  
  if (!isEmpty && updateFriend.last_name && updateFriend.first_name && updateFriend.date_of_birth && updateFriend.email) {
    putFriend(updateFriend.last_name, updateFriend.first_name, updateFriend.date_of_birth, updateFriend.email, id)
    logger.info('200')
    res.status(200).send('200')
  } else if (isEmpty) {
    logger.info('404')
    res.status(400).send('404')
  }
  else {
    logger.info('400')
    res.status(400).send('400')
  }
  next()
});

// DELETE friend
friendsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const friendId = await getFriendById(id)
  const isEmpty = getIsEmptyObject(friendId)
  
  if (!isEmpty) {
    deleteFriend(id)
    logger.info('204')
    res.status(204).send()
  }
  else {
    logger.info('404')
    res.status(404).send('404')
  }
  next()
});

module.exports = friendsRouter;
