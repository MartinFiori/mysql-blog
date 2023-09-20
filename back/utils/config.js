require("dotenv").config();
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  USERS_TABLE,
  FAVORITES_TABLE,
  LIKED_TABLE,
  POSTS_TABLE,
  DB_ROUNDS,
  EXPIRES_IN,
  SECRET
} = process.env;

module.exports = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  bcrypt_rounds: DB_ROUNDS,
  users_table: USERS_TABLE,
  favorites_table: FAVORITES_TABLE,
  liked_table: LIKED_TABLE,
  posts_table: POSTS_TABLE,
  expiresIn: EXPIRES_IN,
  secret: SECRET,
};
