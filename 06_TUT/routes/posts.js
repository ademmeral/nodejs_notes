const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/posts', express.static(path.join(__dirname, '../', 'public')))

router.get('/posts(/index.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'posts','index.html'))
});

router.get('/posts/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'posts', `post-${req.params.id}.html`))
})
module.exports = router;

router.all('posts/*', (req, res) => {
  if (req.accepts('json')) {
    res.status(404).json({error: 'Not found!'})
  } else if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '../', 'pages', '404.html'))
  } else res.status(404).send('Not found!');
})

module.exports = router;