const { users_table, posts_table, favorites_table, liked_table } = require('../utils/config.js')

class Auth {
  static signup(req, res) {
    console.log(req.body)
    // const { username, password, email } = req.body;
    try {
      // const userFoundQuery = `SELECT * FROM ${users_table} WHERE email = ?`
      // db.query(userFoundQuery, [email], (err, result) => {
      //   if (err) return res.json({ error: err.message })
      //   res.json(result)
      // })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = Auth;