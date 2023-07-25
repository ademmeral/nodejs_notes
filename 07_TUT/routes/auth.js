const express = require('express');
const router = express.Router()
const auth = require('../controllers/auth')

router.use(express.json())

router.post('/',auth)

module.exports = router;