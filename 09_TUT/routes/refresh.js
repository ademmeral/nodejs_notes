const express = require('express');
const refresh = require('../controllers/refresh');
const router = express.Router()

router.get('/', refresh);

module.exports = router;