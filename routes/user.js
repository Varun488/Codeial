const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
const passport = require('passport')

console.log('router is loaded')

router.get('/profile/:id', passport.checkAuthentication ,userController.users);
router.post('/update/:id', passport.checkAuthentication, userController.Update);
router.get('/Sing-up', userController.SingUp);
router.get('/Sing-in', userController.SignIn);

router.post('/create', userController.Create);

// use passport as middleware to authenticate
router.post('/CreateSession', passport.authenticate(
    'local',
    {failureRedirect : '/users/Sing-in'},
) , userController.CreateSession)


router.get('/sing-out', userController.destroySession);


module.exports = router;