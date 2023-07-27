function verifyRoles(...roles){
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const result = req.roles.some(role => roles.includes(role))
    if (!result) return res.sendStatus(401);
    return next();
  }
}

module.exports = verifyRoles;