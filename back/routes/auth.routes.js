const router = require("express").Router();
const Auth = require("../controllers/Auth.controller.js");

router.post("/signup", Auth.signup);
router.post("/login", Auth.login);

module.exports = router;
