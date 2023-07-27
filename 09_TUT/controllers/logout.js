const DATA = require('./users.js');

function handleLogout(req, res){
  if (!req.cookies?.jwt) 
    return res.sendStatus(204); // No content

  const refreshToken = req.cookies.jwt;
  const foundUser = DATA.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true})
    return res.sendStatus(204); // Not content
  } 

  const others = DATA.users.filter(user => user.refreshToken !== refreshToken);
  const current = {...foundUser, refreshToken : null}
  DATA.setUsers([...others, current]);

  res.clearCookie('jwt', { httpOnly: true });
  res.sendStatus(204);
}

module.exports = handleLogout;