const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");
const isAuth = require('../middlewares/isAuth.middleware.js')

router.post("/insert", Users.insertPosts);


// post routes
router.get("/post", isAuth, Users.allPosts);
router.delete('/post', isAuth, Users.deletePost)
router.put("/post/:id", isAuth, Users.updatePost);
router.get("/post/:id", isAuth, Users.myPosts);
router.post("/post/:id", isAuth, Users.createPost);

// like routes
router.post("/liked", isAuth, Users.likePost);
router.get("/liked/:id", isAuth, Users.getLikedPosts);
router.delete("/liked/:id", isAuth, Users.deleteFavoritePost);

// favorite routes
router.post("/favorite", isAuth, Users.favoritePost);
router.get("/favorite/:id", isAuth, Users.getFavoritePosts);
router.delete("/favorite/:id", isAuth, Users.deleteFavoritePost);

module.exports = router;
// SELECT u.username, p.content
// FROM users AS u
// INNER JOIN favorites AS f
// ON u.id = f.user_id
// INNER JOIN posts AS p
// ON p.id = f.post_id
// WHERE u.id = 3;
