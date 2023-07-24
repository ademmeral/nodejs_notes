const express = require('express')
const router = express.Router()
const path = require('path');

router.use(express.static(path.join(__dirname, '../', 'public')))

router.get('^/$|/home(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'home.html'))
})
router.get('/images(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'images.html'))
})
router.get('/contact(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'contact.html'))
})
router.get('/about(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'pages', 'about.html'))
})

router.all('*', (req, res) => {
  if (req.accepts('json')) {
    res.status(404).json('Not found!')
  } else if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '../', 'pages', '404.html'))
  } else res.status(404).send('Not found!');
})

module.exports = router;