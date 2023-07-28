const DATA = require('./users');

function logout(req, res){
  // Getting cookie
  const {jwt} = req.cookies;
  if (!jwt) return res.sendStatus(204);   // No content

  // Finding user whose refresh token equals to cookie.jwt
  const foundUser = DATA.users.find(user => user.refreshToken === jwt);

  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true})
    return res.sendStatus(204);
  }
  const others = DATA.users.filter(user => user.refreshToken !== jwt )

  DATA.setMany(
    [...others, {...foundUser, refreshToken : null}]
  )
  res.clearCookie('jwt', {httpOnly: true})
  return res.sendStatus(204);
}

module.exports = logout;