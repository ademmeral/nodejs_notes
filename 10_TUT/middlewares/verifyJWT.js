const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
  // Checking if access token is provided
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.sendStatus(401);

  // Pulling token out by replacing 'Bearer '
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  // Checking if access token if correct
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.UserInfo = {
        user : decoded.UserInfo.user,
        roles : decoded.UserInfo.roles
      }
      return next()
    }
  )
}

module.exports = verifyJWT;