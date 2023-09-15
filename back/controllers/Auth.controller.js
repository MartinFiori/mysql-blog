const {
  users_table,
  posts_table,
  favorites_table,
  liked_table,
} = require("../utils/config.js");
const db = require("../db.js");
const { createHash, isSamePwd } = require("../utils/hash/hash.js");
const isValidEmail = require("../utils/isValidEmail.js");

class Auth {
  static signup(req, res) {
    try {
      const { username, password, email } = req.body;
      if (![username, password, email].every(Boolean))
        return res.json({ error: "Please complete all inputs." });
      if (!isValidEmail(email))
        return res.json({ error: "Email format invalid." });
      const userFoundQuery = `SELECT * FROM ${users_table} WHERE email = ?`;
      const createUserQuery = `INSERT INTO ${users_table}( email, password, username ) VALUES(?)`;

      db.query(userFoundQuery, [email], (err, result) => {
        if (err) return res.json({ error: err.message });
        if (result.length) return res.json({ error: "User already exists." });
        db.query(
          createUserQuery,
          [[email, createHash(password), username]],
          (err, data) => {
            if (err) return res.json({ error: err.message });
            res.json("User created successfully");
          }
        );
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static login(req, res) {
    try {
      const { password, email } = req.body;
      if (![password, email].every(Boolean))
        return res.json({ error: "Please complete all inputs." });
      const userFoundQuery = `SELECT * FROM ${users_table} WHERE email = ?`;
      db.query(userFoundQuery, [email], (err, [userFound]) => {
        if (err) return res.json({ error: err.message });
        if (!userFound) return res.json({ error: "User not found" });
        if (!isSamePwd(password, userFound.password))
          return res.json({ error: "Wrong password" });
        delete userFound.password;
        return res.json(userFound);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = Auth;
