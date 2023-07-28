
function verifyRoles(...allowedRoles){
  return (req, res, next) => {
    const roles = req?.UserInfo.roles;
    if (!roles) return res.sendStatus(406);

    const result = allowedRoles.some(role => roles.includes(role));
    console.log(result)
    if (!result) return res.sendStatus(403);

    return next()
  }
    
};

module.exports = verifyRoles;