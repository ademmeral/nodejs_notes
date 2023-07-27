const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATA = require('./users');

require('dotenv').config({path: __dirname + '/../../.env'})

const auth = function(req, res){
  const {username, email, password} = req.body;
  if ( !(username || email) || !password ) {
    return res.sendStatus(406)   // Not Acceptable
  };
  const foundUser = DATA.users?.find(usr => (
    usr.email === email || usr.username === username
  ))
  if (!foundUser) return res.sendStatus(404);
  const match = bcrypt.compareSync(password, foundUser.password);
  if (!match) return res.sendStatus(401);   // Unauthorized

  const accessToken = jwt.sign(
    {email: foundUser.email},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '50s', algorithm: 'HS256'}    // the Algorithm is default anyway
  );

  const refreshToken = jwt.sign(
    {email: foundUser.email},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d', algorithm: 'HS256'}
  )

  // Saving users with REFRESH_TOKEN
  const others = DATA.users.filter(user => user.email !== foundUser.email)
  const current = {...foundUser, refreshToken}
  DATA.setUsers([...others, current])

  res.cookie('jwt', refreshToken, 
    {httpOnly: true, maxAge: 1000 * 60 * 60 * 24}
    // the httpOnly property means that it's not available to Javascript (no access)
    // To set this property as true, is much more secure than storing something in localStorage
  );
  return res.json({accessToken})
}

module.exports = auth;
