const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


//authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email, password, done) {
        try {
            const user = await User.findOne({ email: email });
    
            if (!user || user.password !== password) {
                console.log('Invalid username or password');
                return done(null, false);
            }
    
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> passport');
            return done(err);
        }
    }));

// serialization
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialization of users
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err) {
        console.log('Error in finding user --> passport');
        return done(err);
    }
})

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
     //if user is authenticated then pass on the request to next function
     if(req.isAuthenticated()){
        return next();
     }

     return res.redirect('/users/Sing-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;