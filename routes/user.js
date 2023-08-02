const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')

console.log('router is loaded')

router.get('/profile', userController.users);


module.exports = router;