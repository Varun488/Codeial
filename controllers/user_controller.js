const User = require('../models/user')

module.exports.users = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: "user profile",
            profile_user: user
        });
    } catch (err) {
        console.error(err);
        // Handle the error as needed
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.Update = async function(req,res){
        try{
            if(req.user.id == req.params.id){
               const user = await User.findByIdAndUpdate(req.params.id, req.body);
               return res.redirect('back');
            }else{
                return res.status(401).send('Unauthorized');
            }
        }catch(err){
              console.error(err);
              return res.status(500).send('Internal Server Error');
        }
}

// For user sign in
module.exports.SignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('Sign-in', {
        title: "Sing-in"
    });
};

// for user sign up
module.exports.SingUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    return res.redirect('/');
}
// for sing-out
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if (err) {
            console.log(err); // Handle the error appropriately
        }
    return res.redirect('/');
    });
}