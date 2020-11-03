const express = require('express')
const cuuid = require('cuuid');
//const { isWebUri } = require('valid-url')
//const logger = require('../logger')
//const store = require('../store')

const bookmarksRouter = express.Router()
const jsonParser = express.json()


let bookmarks = [];

bookmarksRouter.post('/bookmarks', jsonParser, (req, res) => {
  const { title, url, description, rating } = req.body
  if (!title || !url || !rating) {
    return res.status(400).send('Title, url and rating are required!')
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).send('Make sure rating is between 1 and 5!')
  }
  const bookmark = {
    title, url, description, rating,
    id: cuuid()
  }
  bookmarks.push(bookmark)
  res.status(201).json(bookmark)
});

bookmarksRouter.get('/bookmarks', (req, res) => {
  res.send(bookmarks);
});

bookmarksRouter.get('/bookmarks/:id', (req, res) => {
  const bookmark = bookmarks.find(b => b.id == req.params.id)
  if (bookmark) {
    res.json(bookmark)
  } else {
    res.status(404).send('404 Not Found')
  }
});

//DELETE
bookmarksRouter.delete('/bookmarks/:id', (req, res) => { 
  const index = bookmarks.findIndex(b => b.id == req.params.id)
bookmarks.splice(index, 1)
res.sendStatus(204);

})

module.exports = bookmarksRouter