const router = require("express").Router();
const Users = require("../controllers/Users.controller.js");

router.get("/", Users.allPosts);
router.get("/:id", Users.myPosts);
router.post("/:id", Users.createPost);
router.post("/", Users.insertPosts);

module.exports = router;
