const express = require('express');
const router = express.Router()
const DATA = require('../../controllers/users');

router.get('/', DATA.getOne)

module.exports = router;