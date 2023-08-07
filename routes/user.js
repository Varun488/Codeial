const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')

console.log('router is loaded')

router.get('/profile', userController.users);
router.get('/Sing-up', userController.SingUp);
router.get('/Sing-in', userController.SignIn);

router.post('/create', userController.Create);

module.exports = router;