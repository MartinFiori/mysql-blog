const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");

router.post("/insert", Users.insertPosts);


// post routes
router.get("/post", Users.allPosts);
router.delete('/post', Users.deletePost)
router.put("/post/:id", Users.updatePost);
router.get("/post/:id", Users.myPosts);
router.post("/post/:id", Users.createPost);

// like routes
router.post("/liked", Users.likePost);
router.get("/liked/:id", Users.getLikedPosts);
router.delete("/liked/:id", Users.deleteFavoritePost);

// favorite routes
router.post("/favorite", Users.favoritePost);
router.get("/favorite/:id", Users.getFavoritePosts);
router.delete("/favorite/:id", Users.deleteFavoritePost);

module.exports = router;
// SELECT u.username, p.content
// FROM users AS u
// INNER JOIN favorites AS f
// ON u.id = f.user_id
// INNER JOIN posts AS p
// ON p.id = f.post_id
// WHERE u.id = 3;
