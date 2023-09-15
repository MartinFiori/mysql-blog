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
        if (err) return res.json({ error: err.message })
        res.json(posts)
      })
    } catch (err) {
      return res.json({ error: err.message })
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
      return res.json({ error: err.message })
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
      return res.json({ error: err.message })
    }
  }

  static updatePost(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (!id) return res.status(400).json({ error: "Missing user id" });
      if (!content)
        return res.status(400).json({ error: "Cannot edit without content" });
      const query = `UPDATE ${posts_table} SET content = ? WHERE id = ?; `
      db.query(query, [content, id], (err) => {
        if (err) return res.json({ error: err.message });
        res.json('Post edited!')
      });
    } catch (err) {
      return res.json({ error: err.message })
    }
  }

  static likePost(req, res) {
    const { post_id, user_id } = req.body;
    // Validate input
    if (![post_id, user_id].every(Boolean)) {
      return res.status(400).json({ error: "Missing id's" });
    }
    const findUserQuery = `SELECT * FROM ${users_table} WHERE id = ?;`;
    const findPostQuery = `SELECT * FROM ${posts_table} WHERE id = ?;`;
    const likeQuery = `INSERT INTO ${liked_table} (user_id, post_id) VALUES (?, ?);`;
    // Check if user and post exist and then insert the like
    db.query(findUserQuery, [user_id], (err, [user]) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.json({ error: "User doesn't exist" });
      }
      db.query(findPostQuery, [post_id], (err, [post]) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!post) {
          return res.json({ error: "Post doesn't exist" });
        }
        db.query(likeQuery, [user_id, post_id], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.json({ message: 'Post liked!' });
        });
      });
    });
  }


  static favoritePost(req, res) {
    const { post_id, user_id } = req.body;
    try {
      if (![post_id, user_id]) return res.status(400).json({ error: "Missing id's" });
      const query = `INSERT INTO ${favorites_table}(user_id,post_id) VALUES (?,?)`
      db.query(query, [user_id, post_id], (err) => {
        if (err) return res.json({ error: err.message });
        res.json('Post saved!')
      })
    } catch (err) {
      return res.json({ error: err.message })
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
      console.log(users);
      db.query(
        `INSERT INTO ${users_table} (username,password,email) VALUES (?, ?, ?)`,
        [username, password, email],
        (err) => {
          if (err) return res.status(400).json({ error: err.message })
        }
      );
    }
    const arr = [
      "suscipit urna Cras at in Cras ac in justo Fusce ac orci aliquam Cras urna ullamcorper ullamcorper mattis nibh turpis ac justo suscipit Fusce sapien Morbi in et lacinia et auctor amet consectetur nunc",
      "primis posuere ac feugiat ac ipsum iaculis efficitur ante auctor a aliquam feugiat vel laoreet a a posuere auctor sapien nunc faucibus Vestibulum primis et feugiat adipiscing ante ut urna sapien sem orci",
      "Morbi efficitur sit ipsum quis Curae; urna laoreet ut cubilia at ligula Nunc Nunc elit porttitor ante cubilia Curabitur cubilia posuere at sapien in lacinia ipsum vel urna Nullam orci elit nunc at ut",
      "ipsum id ac elit justo nunc Vivamus Nunc et feugiat Vestibulum elit justo porttitor feugiat ante ante Fusce blandit Curabitur id consectetur Morbi vel faucibus urna ante tempor aliquam eu elit amet et",
      "porttitor tempor posuere sit lacinia Morbi blandit justo ullamcorper sem vel mattis iaculis at quis ante Nullam justo lacinia quis Phasellus nunc Nunc efficitur Vestibulum Cras Fusce quis elit lacinia",
      "justo Curae; et vel ligula lacinia adipiscing ante nibh dolor quis ac Cras orci justo consectetur orci urna sem primis in vitae Lorem sapien urna efficitur suscipit Nullam Curabitur aliquam faucibus lacinia",
      "vitae justo in Cras libero orci Curae; ac efficitur ipsum nibh libero ultrices elit Morbi orci ac Vivamus feugiat Fusce sapien consectetur at tincidunt iaculis urna Vivamus Nunc primis feugiat elit vitae",
      "ante ipsum Cras quis in porttitor auctor vitae vitae dolor ipsum consectetur Fusce lacinia ligula faucibus mattis Vivamus ullamcorper est Curae; vel faucibus primis feugiat tincidunt vitae ante libero",
      "mattis ac sapien faucibus eu orci sapien Vestibulum Fusce orci et urna Curabitur ipsum ac dolor a ac urna ac luctus Vivamus Vivamus sapien tincidunt lacinia urna at suscipit urna ipsum Lorem libero consectetur",
      "Morbi faucibus sapien Fusce vitae auctor adipiscing orci ac nibh ligula sem luctus Nullam Nullam tempor Nunc in luctus quis Fusce efficitur porttitor cubilia mattis ipsum luctus Nullam id et ante Curae",
      "justo Curae; et vel ligula lacinia adipiscing ante nibh dolor quis ac Cras orci justo consectetur orci urna sem primis in vitae Lorem sapien urna efficitur suscipit Nullam Curabitur aliquam faucibus lacinia",
      "vitae justo in Cras libero orci Curae; ac efficitur ipsum nibh libero ultrices elit Morbi orci ac Vivamus feugiat Fusce sapien consectetur at tincidunt iaculis urna Vivamus Nunc primis feugiat elit vitae",
      "ante ipsum Cras quis in porttitor auctor vitae vitae dolor ipsum consectetur Fusce lacinia ligula faucibus mattis Vivamus ullamcorper est Curae; vel faucibus primis feugiat tincidunt vitae ante libero",
      "mattis ac sapien faucibus eu orci sapien Vestibulum Fusce orci et urna Curabitur ipsum ac dolor a ac urna ac luctus Vivamus Vivamus sapien tincidunt lacinia urna at suscipit urna ipsum Lorem libero consectetur",
      "Morbi faucibus sapien Fusce vitae auctor adipiscing orci ac nibh ligula sem luctus Nullam Nullam tempor Nunc in luctus quis Fusce efficitur porttitor cubilia mattis ipsum luctus Nullam id et ante Curae",
      "justo Curae; et vel ligula lacinia adipiscing ante nibh dolor quis ac Cras orci justo consectetur orci urna sem primis in vitae Lorem sapien urna efficitur suscipit Nullam Curabitur aliquam faucibus lacinia",
      "vitae justo in Cras libero orci Curae; ac efficitur ipsum nibh libero ultrices elit Morbi orci ac Vivamus feugiat Fusce sapien consectetur at tincidunt iaculis urna Vivamus Nunc primis feugiat elit vitae",
      "ante ipsum Cras quis in porttitor auctor vitae vitae dolor ipsum consectetur Fusce lacinia ligula faucibus mattis Vivamus ullamcorper est Curae; vel faucibus primis feugiat tincidunt vitae ante libero",
      "mattis ac sapien faucibus eu orci sapien Vestibulum Fusce orci et urna Curabitur ipsum ac dolor a ac urna ac luctus Vivamus Vivamus sapien tincidunt lacinia urna at suscipit urna ipsum Lorem libero consectetur",
      "Morbi faucibus sapien Fusce vitae auctor adipiscing orci ac nibh ligula sem luctus Nullam Nullam tempor Nunc in luctus quis Fusce efficitur porttitor cubilia mattis ipsum luctus Nullam id et ante Curae",
    ];

    for (let i = 0; i < arr.length; i++) {
      function random(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const num = random(0, 5);
      const query = `INSERT INTO ${posts_table}(content,user_id) VALUES(?, ?)`;
      // console.log(num, i);
      db.query(query, [arr[i], num], (err) => {
        // if (err) return res.json({ error: err.message })
      });
    }
    for (let i = 5; i < arr.length; i++) {
      function random(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const num = random(0, 5);
      const query = `INSERT INTO ${posts_table}(content,user_id) VALUES(?, ?)`;
      // console.log(num, i);
      db.query(query, [arr[i], num], (err) => {
        if (err) return res.json({ error: err.message })
      });
    }
    res.json("todo ok");
  }
}

module.exports = Users;
