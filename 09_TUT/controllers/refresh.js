const DATA = require('./users.js');
const jwt = require('jsonwebtoken');

function handleRefreshToken(req, res){
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = DATA.users?.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || (decoded.email !== foundUser.email)) 
        return res.sendStatus(403);

        const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
          {
            UserInfo : {
              email : decoded.email, 
              roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn : '50s'}
        )
        return res.json({accessToken});
    }
  )
}

module.exports = handleRefreshToken