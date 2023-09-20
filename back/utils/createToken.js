const jwt = require('jsonwebtoken')
const { secret, expiresIn } = require('./config.js')

function createToken(user) {
  return jwt.sign({ user }, secret, { expiresIn })
}

module.exports = createToken;