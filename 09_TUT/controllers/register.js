const bcrypt = require('bcrypt');
const DATA = require('./users.js');

function register(req, res){
  const {username, email, password} = req.body;
  if (!username || !email || !password) 
    return res.sendStatus(406);

  const userExists = DATA.users.find(user => (
    user.email === email || user.username === username
  ));
  if (userExists) return res.sendStatus(409);

  try{
    const hashedPwd = bcrypt.hashSync(password, 10)
    DATA.addOne({
      ...req.body, password: hashedPwd
    })
    return res.sendStatus(201)
  } catch (err){
    console.log(err)
    return res.sendStatus(500);
  }
}

module.exports = register;