require('dotenv').config()

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1]  // Bearer TOKEN --> [Bearer, TOKEN]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {   // decoded --> email
      if (err) return res.sendStatus(403);  // Forbidden
      req.email = decoded.email;
      return next();
    }
  )
}

module.exports = verifyJWT;