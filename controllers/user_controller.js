const User = require('../models/user')

module.exports.users = function(req,res){
    return res.render('user_profile', {
        title:"user profile"
    });
};


// For user sign in
module.exports.SignIn = function(req,res){
    return res.render('Sign-in', {
        title: "Sing-in"
    });
};

// for user sign up
module.exports.SingUp = function(req,res){
    return res.render('sign-up', {
        title: "Sing-up"
    })
}

// for user sign-up
module.exports.Create = async (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
        try {
          const user = await User.findOne({ email: req.body.email }).exec();
          if (!user) {
            // User does not exist, create a new user
            await User.create(req.body);
            return res.redirect('/users/Sing-in');
          } else {
            // User already exists, render 'back' view
            return res.redirect('back');
          }
        } catch (err) {
          console.log('Error:', err.message);
          return res.status(500).json({ error: 'Server error' });
        }
      };


// for user sign-in 
module.exports.CreateSession = function(req,res){
    //TODO
}
