const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");

router.get("/", Users.allPosts);
router.post("/", Users.createPost);

module.exports = router;