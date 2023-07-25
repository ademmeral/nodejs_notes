const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_DB = require('../modal/users.json');

function addNewUser(req, res){
  const {password, username, email} = req.body;    // Check passw/username
  
  if (!password || !username || !email) {
    res.sendStatus(400);
  };

  const dublicate = USERS_DB.find(user => (
    (user.username == username) || (user.email == email)
  ))

  if (dublicate) {
    console.log(dublicate)
    res.sendStatus(409)   // Conflict
  };

  try{  // Data that will be hashed must be in type of string
    const hashedPwd = bcrypt.hashSync(password.toString(), 10)
    USERS_DB.push({...req.body, password: hashedPwd});
    fs.writeFileSync(
      path.join(__dirname, '../', 'modal', 'users.json'), 
      JSON.stringify(USERS_DB)
    )
    res.sendStatus(201)   // success
  } catch (err) {
    res.sendStatus(500)   // server-side error
  }
}

module.exports = addNewUser;