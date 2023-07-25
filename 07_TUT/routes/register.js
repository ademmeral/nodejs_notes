const express = require('express');
const router = express.Router()
const addNewUser = require('../controllers/register')

router.use(express.json())

router.post('/',addNewUser)

module.exports = router;