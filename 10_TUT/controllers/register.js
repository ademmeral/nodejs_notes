const DATA = require('./users');
const bcrypt = require('bcrypt');

function register(req, res){
  const {password} = req.body

  try{
    const hashedPwd = bcrypt.hashSync(password, 10)
    DATA.addOne({
      ...req.body, password : hashedPwd, roles : [2534]   // Default authentication role is User
    })
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
}

module.exports = register;