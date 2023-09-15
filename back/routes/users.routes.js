const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");

router.get("/", Users.allPosts);
router.get("/:id", Users.myPosts);

router.put("/:id", Users.updatePost);

router.post('/like', Users.likePost)
router.post('/favorite', Users.favoritePost)
router.post("/insert", Users.insertPosts);
router.post("/:id", Users.createPost);

module.exports = router;
