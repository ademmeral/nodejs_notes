const refreshController = require('../controllers/refresh');
const express = require('express');
const router = express.Router()

router.get('/', refreshController)

module.exports = router;