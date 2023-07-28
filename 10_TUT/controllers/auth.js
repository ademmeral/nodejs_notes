const jwt = require('jsonwebtoken');
const DATA = require('./users');

const bcrypt = require('bcrypt');

function auth(req, res){
  const { email, username, password } = req.body;

  if (!(email || username) || !password) return res.sendStatus(401); // Unauthorized

  // User can log in either the username or email
  // So, Check if which value is provided
  const value = email || username;

  // Check if user exists
  const foundUser = DATA.users.find((user) => 
    user.email === value || user.username === value
  );
  if (!foundUser) return res.sendStatus(401);

  // Checking if hashed password is correct
  const checkPwd = bcrypt.compare(password, foundUser.password)
  if (!checkPwd) return res.sendStatus(401);

  const accessToken = jwt.sign(
    {
      UserInfo : {
        user : req.body.email || req.body.username,
        roles : foundUser.roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );

  const refreshToken = jwt.sign(
    { UserInfo : {user : req.body.email || req.body.username} },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Inserting refresh token
  const others = DATA.users.filter(user => 
    user.email !== foundUser.email && user.username !== foundUser.username
  );
  const current = {...foundUser, refreshToken : refreshToken}
  DATA.setMany([...others, current])   // As if it's immutable x()

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.json({ accessToken });
}

module.exports = auth;