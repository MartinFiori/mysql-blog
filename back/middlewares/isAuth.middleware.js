const jwt = require('jsonwebtoken')
const { secret } = require('../utils/config.js')

function isAuth(req, res, next) {
  const authHeaders = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeaders) return res.status(401).json({ error: 'Access unauthorized' });
  const [authType, token] = authHeaders.split(' ');
  if (authType !== 'Bearer')
    return res.status(401).json({ error: 'Invalid token type' });
  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ err: "Couldn't decodify token" });
    req.user = decoded.user;
    next();
  })
}


module.exports = isAuth


