const {users} = require('./users');
const jsonwt = require('jsonwebtoken')

function refresh(req, res){
  // Checking the cookie
  const {jwt} = req.cookies;
  if (!jwt) return res.sendStatus(401);

  // Finding user whose refresh token equalt to jwt
  const foundUser = users.find(user => user.refreshToken === jwt);
  if (!foundUser) return res.sendStatus(401);

  return jsonwt.verify(
    jwt,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(401);

      const accessToken = jsonwt.sign(
        {
          UserInfo : {
            user : decoded.UserInfo.user,
            roles : foundUser.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '30s'}
      )
      return res.json({ accessToken })
    }
  )
}

module.exports = refresh;