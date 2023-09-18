const {
  users_table,
  posts_table,
  favorites_table,
  liked_table,
} = require("../utils/config.js");
const db = require("../db.js");

class Users {
  static allPosts(req, res) {
    try {
      const postsQuery = `SELECT * FROM ${posts_table} ORDER BY created_at DESC`;
      db.query(postsQuery, (err, posts) => {
        if (err) return res.json({ error: err.message });
        res.json(posts);
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static myPosts(req, res) {
    try {
      const { id } = req.params;
      const postsQuery = `SELECT * FROM ${posts_table} WHERE user_id = ? ORDER BY id DESC;`;
      db.query(postsQuery, [id], (err, user_posts) => {
        if (err) return res.json({ error: err.message });
        res.json(user_posts);
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static createPost(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (!id) return res.status(400).json({ error: "Missing user id" });
      if (!content)
        return res.status(400).json({ error: "Cannot post without content" });
      const query = `INSERT INTO ${posts_table} (content,user_id) VALUES(?,?)`;
      db.query(query, [content, parseInt(id)], (err, creation) => {
        if (err) return res.json({ error: err.message });
        return res.json("Post created");
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static updatePost(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (!id) return res.status(400).json({ error: "Missing user id" });
      if (!content)
        return res.status(400).json({ error: "Cannot edit without content" });
      const query = `UPDATE ${posts_table} SET content = ? WHERE id = ?; `;
      db.query(query, [content, id], (err) => {
        if (err) return res.json({ error: err.message });
        res.json("Post edited!");
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static likePost(req, res) {
    const { post_id, user_id } = req.body;
    if (![post_id, user_id].every(Boolean)) {
      return res.status(400).json({ error: "Missing id's" });
    }
    const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?;`;
    const findPostQuery = `SELECT * FROM ${posts_table} WHERE id = ?;`;
    const likeQuery = `INSERT INTO ${liked_table} (user_id, post_id) VALUES (?, ?);`;

    db.query(findUserQuery, [user_id], (err, [user]) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!user) return res.status(400).json({ error: "User doesn't exist" });

      db.query(findPostQuery, [post_id], (err, [post]) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!post) return res.status(400).json({ error: "Post doesn't exist" });
        db.query(likeQuery, [user_id, post_id], (err) => {
          if (err) return res.status(500).json({ error: err.message });
          return res.json("Post liked!");
        });
      });
    });
  }

  static favoritePost(req, res) {
    try {
      const { post_id, user_id } = req.body;
      if (![post_id, user_id].every(Boolean))
        return res.status(400).json({ error: "Missing id's" });
      const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?;`;
      const findPostQuery = `SELECT * FROM ${posts_table} WHERE id = ?;`;
      const favoriteQuery = `INSERT INTO ${favorites_table} (user_id, post_id)
                              SELECT ${user_id}, ${post_id}
                              WHERE NOT EXISTS (
                              SELECT * FROM ${favorites_table} WHERE user_id = ${user_id} AND post_id = ${post_id}
                              );`;

      db.query(findUserQuery, [user_id], (err, [user]) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "User doesn't exist" });
        db.query(findPostQuery, [user_id], (err, [post]) => {
          if (err) return res.status(500).json({ error: err.message });
          if (!post) return res.status(400).json({ error: "User doesn't exist" });
          db.query(favoriteQuery, [user_id, post_id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
          });
        });
      });
      res.json("Post added to favorites!");
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static deletePost(req, res) {
    try {
      const { id } = req.params;
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static getFavoritePosts(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({ error: "Must provide an user id" });

      const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?`;
      const userFavoritesQuery = `SELECT p.id, p.content, u.img_profile, u.username, p.created_at, p.updated_at
                                  FROM users AS u
                                  INNER JOIN ${favorites_table} AS f
                                  ON u.id = f.user_id
                                  INNER JOIN ${posts_table} AS p
                                  ON p.id = f.post_id
                                  WHERE u.id = ?;`;

      db.query(findUserQuery, [id], (err, [user]) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
      });

      db.query(userFavoritesQuery, [id], (err, posts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(posts);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static getLikedPosts(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({ error: "Must provide an user id" });

      const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?`;
      const userLikedQuery = `SELECT p.id, p.content, u.img_profile, u.username, p.created_at, p.updated_at
                              FROM ${users_table} AS u
                              INNER JOIN ${liked_table} AS f
                              ON u.id = f.user_id
                              INNER JOIN ${posts_table} AS p
                              ON p.id = f.post_id
                              WHERE u.id = ?;`;
      db.query(findUserQuery, [id], (err, [user]) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
      });

      db.query(userLikedQuery, [id], (err, posts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(posts);
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static deleteFavoritePost(req, res) {
    try {
      const { user_id, post_id } = req.body;
      if (![post_id, user_id].every(Boolean)) return res.status(400).json({ error: "Missing ids" });
      const findPostQuery = `SELECT * FROM ${posts_table} WHERE id = ?`;
      const deletePostQuery = `DELETE FROM ${favorites_table} WHERE user_id = ? AND post_id = ?`;
      const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?`;
      db.query(findUserQuery, [user_id], (err, [user]) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
        db.query(findPostQuery, [post_id], (err, [post]) => {
          if (err) return res.status(400).json({ error: err.message });
          if (!post) return res.status(404).json({ error: "Post not found" });
          db.query(deletePostQuery, [user_id, post_id], (err, data) => {
            if (err) return res.status(400).json({ error: err.message });
            console.log(data);
            res.json("Post deleted");
          });
        });
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static deleteLikedPost(req, res) {
    try {
      const { user_id, post_id } = req.body;
      if (![post_id, user_id].every(Boolean)) return res.status(400).json({ error: "Missing ids" });
      const findPostQuery = `SELECT * FROM ${posts_table} WHERE id = ?`;
      const deletePostQuery = `DELETE FROM ${liked_table} WHERE user_id = ? AND post_id = ?`;
      const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?`;
      db.query(findUserQuery, [user_id], (err, [user]) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
        db.query(findPostQuery, [post_id], (err, [post]) => {
          if (err) return res.status(400).json({ error: err.message });
          if (!post) return res.status(404).json({ error: "Post not found" });
          db.query(deletePostQuery, [user_id, post_id], (err, data) => {
            if (err) return res.status(400).json({ error: err.message });
            console.log(data);
            res.json("Post deleted");
          });
        });
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static insertPosts(req, res) {
    const users = [
      { username: "vayne", password: "vayne", email: "vayne@gmail.com" },
      { username: "singed", password: "singed", email: "singed@gmail.com" },
      { username: "lucian", password: "lucian", email: "lucian@gmail.com" },
      { username: "ivern", password: "ivern", email: "ivern@gmail.com" },
      { username: "ezreal", password: "ezreal", email: "ezreal@gmail.com" },
    ];

    for (let i = 0; i < users.length; i++) {
      const { password, username, email } = users[i];
      // console.log(users);
      db.query(
        `INSERT INTO ${users_table} (username,password,email) VALUES (?, ?, ?)`,
        [username, password, email],
        (err) => {
          if (err) return res.status(400).json({ error: err.message });
        }
      );
    }
    db.query(
      `INSERT INTO posts (content, user_id)
VALUES
('justo Curae et vel ligula lacinia adipiscing', FLOOR(1 + RAND() * 5)),
('vitae justo in Cras libero orci Curae', FLOOR(1 + RAND() * 5)),
('ante ipsum Cras quis in', FLOOR(1 + RAND() * 5)),
('mattis ac sapien faucibus eu orci sapien Vestibulum Fusce', FLOOR(1 + RAND() * 5)),
('Morbi faucibus sapien Fusce vitae auctor adipiscing', FLOOR(1 + RAND() * 5)),
('justo Curae et vel ligula lacinia adipiscing', FLOOR(1 + RAND() * 5)),
('vitae justo in Cras libero orci Curae', FLOOR(1 + RAND() * 5)),
('ante ipsum Cras quis in', FLOOR(1 + RAND() * 5)),
('mattis ac sapien faucibus eu orci sapien Vestibulum Fusce', FLOOR(1 + RAND() * 5)),
('Morbi faucibus sapien Fusce vitae auctor adipiscing', FLOOR(1 + RAND() * 5)),
('justo Curae et vel ligula lacinia adipiscing', FLOOR(1 + RAND() * 5)),
('vitae justo in Cras libero orci Curae', FLOOR(1 + RAND() * 5)),
('ante ipsum Cras quis in', FLOOR(1 + RAND() * 5)),
('mattis ac sapien faucibus eu orci sapien Vestibulum Fusce', FLOOR(1 + RAND() * 5)),
('Morbi faucibus sapien Fusce vitae auctor adipiscing', FLOOR(1 + RAND() * 5));
`,
      (err) => {
        if (err) return res.status(400).json({ error: err.message });
      }
    );
    res.json("todo ok");
  }
}

module.exports = Users;
