const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DATA = require('./users');

function auth (req, res){
  const {username, email, password} = req.body;
  // console.log(username, email, password)
  if (!(email || username) || !password) 
    return res.sendStatus(406);
  
  const foundUser = DATA.users.find(user => 
    user.email === email || user.username === username
  );
  if (!foundUser) return res.sendStatus(404);

  const match = bcrypt.compare(password, foundUser.password)
  if (!match) return res.sendStatus(401);

  const roles = Object.values(foundUser.roles)

  console.log(req.roles)
  const accessToken = jwt.sign(
    {
      UserInfo : {
        email : foundUser.email, 
        roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '50s'}
  )
  const refreshToken = jwt.sign(
    {email : foundUser.email},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '50s'}
  )
  const others = DATA.users.filter(user => user.email !== foundUser.email)
  const current = {...foundUser, refreshToken}
  DATA.setUsers([...others, current]);

  res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
  return res.json({accessToken})
  
}

module.exports = auth;