const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controller')
const passport = require('passport')

console.log('router is loaded')

router.post('/create', passport.checkAuthentication , commentController.create);

module.exports = router;