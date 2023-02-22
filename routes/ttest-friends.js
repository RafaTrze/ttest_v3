const express = require('express');

const logger = require('../src/utils/logger');
const {getIsEmptyObject, getIsEmptyObjectKeyValue, getToday} = require('../src/utils/support_functions');
const {getAllFriends, getBDFriends, getFriendById, putFriend, postFriend, deleteFriend} = require('../src/utils/model_functions')

friendsRouter = express.Router();

// GET friends
friendsRouter.get('/', async (req, res, next) => { 
  const friends = await getAllFriends();
  const isEmpty = getIsEmptyObject(friends);
  
  if (friends && !isEmpty) {
    logger.info(`${req.method} 200`)
    res.status(200).send(friends)
  } else if (isEmpty) {
    logger.info(`${req.method} 204`)
    res.status(204).send()
  }
  else {
    const error = new Error('404')
    error.status = 404
    return next(error, req)

  }
  next()
});

// GET birthday friends
friendsRouter.get('/bd', async (req, res, next) => {
  today = getToday().substring(5);
  const bdFriends = await getBDFriends(today);
  const isEmpty = getIsEmptyObject(bdFriends)

  if (!isEmpty) {
    logger.info(`${req.method} 200`)
    return res.status(200).send(bdFriends)

  } else if (isEmpty) {
    logger.info(`${req.method} 204`)
    return res.status(204).send()

  } else {
    const error = new Error('404')
    error.status = 404;
    return next(error, req)

  }
  next()
});

// GET friend by id
friendsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const friendById = await getFriendById(id);
  const isEmpty = getIsEmptyObject(friendById);

  if (!isEmpty) {
    logger.info(`${req.method} 200`)
    res.status(200).send(friendById)

  }
  else {
    const error = new Error('404')
    error.status = 404;
    return next(error, req)

  }
  next()
});

// POST friend
friendsRouter.post('/', (req, res, next) => {
  const newFriend = req.query
  const isEmptyKeyValue = getIsEmptyObjectKeyValue(newFriend)
  
  // check if any key vale pairs are empty
  if (!isEmptyKeyValue) {
    postFriend(newFriend.last_name, newFriend.first_name, newFriend.date_of_birth, newFriend.email)
    logger.info(`${req.method} 201`)
    res.status(200).send('201')

  } else if(isEmptyKeyValue) {
    const error = new Error('400')
    error.status = 400
    return next(error, req)

  } else {
    const error = new Error('500')
    return next(error, req)

  }
  next()
});

// PUT friend
friendsRouter.put('/:id', async (req, res, next) => {
  const updateFriend = req.query
  const id = req.params.id
  const friendId = await getFriendById(id)
  const isEmpty = getIsEmptyObject(friendId)
  const isEmptyKeyValue = getIsEmptyObjectKeyValue(updateFriend)
  
  // check for empty object and empty keys value pairs
  if (!isEmpty && !isEmptyKeyValue) {
    await putFriend(updateFriend.last_name, updateFriend.first_name, updateFriend.date_of_birth, updateFriend.email, id)
    logger.info(`${req.method} 200`)
    res.status(200).send('200')

  } else if (isEmpty) {
    const error = new Error('404')
    error.status = 404
    return next(error, req)

  }
  else if (isEmptyKeyValue) {
    const error = new Error('400')
    error.status = 400
    return next(error, req)

  } else {
    const error = new Error('500')
    return next(error, req)

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
    logger.info(`${req.method} 204`)
    res.status(204).send()

  }
  else if (isEmpty) {
    const error = new Error('404')
    error.status = 404;
    return next(error, req)

  } else {
    const error = new Error('500')
    return next(error, req)

  }
  next()
});

module.exports = friendsRouter;
