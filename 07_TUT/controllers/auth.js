const USER_DB = require('../modal/users.json');

const bcrypt = require('bcrypt');

function auth(req, res){
  const {username, email, password} = req.body;
  if ( !(username || email) || !password ){
    res.sendStatus(400)
  }
  const userExists = USER_DB.find(user => (
    (user.email === email || user.username === username) 
  ));
  if (!userExists) {
    res.sendStatus(401)   // Unauthorized
  }
  const match = bcrypt.compareSync(password, userExists.password);
  if (!match) res.sendStatus(401)
  else res.sendStatus(200);
}

module.exports = auth;