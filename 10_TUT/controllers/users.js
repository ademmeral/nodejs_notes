const path = require('path');
const fs = require('fs');
const USER_MODEL = require('../models/user.json');

// IMPORTANT : Do not use "this". I don't know what does "this" actually do!
const DATA = {
  users : require('../models/users.json'),
  setMany : function(data) {
    DATA.users = data;
    fs.writeFileSync(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(DATA.users)
    )
  },
  getMany : function(req, res, next){ res.json(DATA.users) },
  getOne : function(req, res){ 
    if (!req.email) throw new Error('Email is required');

    const usr = DATA.users.find(usr => usr.email === req.email)
    return res.status(200).json(usr)
  },
  setOne : function(req, res, next){
    return res.sendStatus(200)
    if (!obj?.email) {
      const errMsg = 'setOne function accepts an Object literal as a parameter including email.'
      throw new Error(errMsg)
    }
    const usr = DATA.users.find(user => user.email === obj.email)
    DATA.setUsers([...DATA.user, {...usr, ...obj}])
    next()
  },
  deleteOne : function(req, res) {
    return res.sendStatus(200)
    DATA.setUsers(
      DATA.users.filter(user => user.email !== req.params.email)
    )
  },
  addOne : function(obj){
    const cond = Object.keys(USER_MODEL)
      .every(key => obj.hasOwnProperty(key));

    if (!cond) throw new Error('Parameter must include all the properties.');
    
    DATA.setUsers([...DATA.users, obj])
  }
}

module.exports = DATA