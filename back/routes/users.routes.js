const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");

router.get("/favorite/:id", Users.getFavoritePosts);
router.get("/:id", Users.myPosts);
router.get("/", Users.allPosts);

router.put("/:id", Users.updatePost);

router.post("/like", Users.likePost);
router.post("/favorite", Users.favoritePost);
router.post("/insert", Users.insertPosts);
router.post("/:id", Users.createPost);

router.delete("/:id", Users.deleteFavoritePost);

module.exports = router;
// SELECT u.username, p.content
// FROM users AS u
// INNER JOIN favorites AS f
// ON u.id = f.user_id
// INNER JOIN posts AS p
// ON p.id = f.post_id
// WHERE u.id = 3;
