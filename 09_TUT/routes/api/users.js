const express = require('express');
const router = express.Router()
const DATA = require('../../controllers/users');
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLE_LIST = require('../../models/roleList')

router.route('/')
  .get(DATA.getMany)
  .post(verifyRoles(
    ROLE_LIST.Admin, ROLE_LIST.Author), 
    (req,res) => res.sendStatus(200)
  )
  .put(verifyRoles(
    ROLE_LIST.Admin, ROLE_LIST.Editor), 
    (req,res) => res.sendStatus(200)
  )
  .delete(verifyRoles(
    ROLE_LIST.Admin), 
    (req,res) => res.sendStatus(200)
  )

module.exports = router;

// 40312, 301704, 427004, 