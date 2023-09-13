const bcrypt = require("bcrypt");
const { bcrypt_rounds } = require("../config.js");

function createHash(pwd) {
  return bcrypt.hashSync(pwd, bcrypt.genSaltSync(parseInt(bcrypt_rounds)));
}

function isSamePwd(pwd, db_pwd) {
  return bcrypt.compareSync(pwd, db_pwd);
}

module.exports = { createHash, isSamePwd };
