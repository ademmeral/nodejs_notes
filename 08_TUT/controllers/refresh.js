require('dotenv').config({path: __dirname + '/../../.env'})

const DATA = require('./users.js');
const jwt = require('jsonwebtoken');


function handleRefreshToken(req, res){
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies['jwt'];

  const foundUser = DATA.users?.find(user => user.refreshToken === refreshToken)
  if (!foundUser) return res.sendStatus(403); // Forbidden
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if ( err || (decoded.email !== foundUser.email) ) {
        return res.sendStatus(403); // Forbidden
      }
      const accessToken = jwt.sign(
        {email: decoded.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '50s'}
        
      ) // jwt.sign end
      return res.json({ accessToken })
    } // Callback end
  ) // jwt.verify end
} // handleRefreshToken end

module.exports = handleRefreshToken;