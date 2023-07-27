const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1]  // Bearer TOKEN --> [Bearer, TOKEN]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {   // decoded --> email
      if (err) return res.sendStatus(403);  // Forbidden
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
      return next();
    }
  )
}

module.exports = verifyJWT;