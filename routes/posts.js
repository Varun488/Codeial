const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller')
const passport = require('passport')

console.log('router is loaded')

router.get('/post', postController.post);

router.post('/create', passport.checkAuthentication , postController.createpost);
router.get('/destroy/:id', passport.checkAuthentication, postController.deletepost);

module.exports = router;