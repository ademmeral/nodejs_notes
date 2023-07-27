const express = require('express');
const router = express.Router()
const DATA = require('../../controllers/users');
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLE_LIST = require('../../configs/roles')

router.route('/')
  .get(DATA.getUsers)
  .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Author), DATA.addOne)
  .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), DATA.setOne)
  .delete(verifyRoles(ROLE_LIST.Admin), DATA.deleteOne)

module.exports = router;