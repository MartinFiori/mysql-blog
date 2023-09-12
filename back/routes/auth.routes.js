const router = require('express').Router();
const db = require('../db.js');
const Auth = require('../controllers/Auth.controller.js')

router.post('/signup', (req, res) => {
  console.log(req.body)
})
module.exports = router;