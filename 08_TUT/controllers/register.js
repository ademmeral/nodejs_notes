const bcrypt = require('bcrypt');
const DATA = require('./users.js');

const register = function(req, res){
  const {username, email, password} = req.body;   // Checks if all the props are provided
  if (!(username || email) || !password) {
    res.sendStatus(400)
  };

  const userExists = DATA.users.find(user => (            // Checks if user exists
    (user.username == username) || (user.email == email)
  ));
  if (userExists) res.sendStatus(409) // Conflict

  try{      // Try to update users.json
    const hashedPwd = bcrypt.hashSync(password, 10);
    DATA.addOne({...req.body, password: hashedPwd})
    return res.sendStatus(201)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

module.exports = register;