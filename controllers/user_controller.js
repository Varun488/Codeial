const User = require('../models/user')

module.exports.users = async function(req, res) {
    try {
      if (req.cookies.user_id) {
        const user = await User.findById(req.cookies.user_id).exec();
        if (user) {
          return res.render('user_profile', {
            title: "User Profile",
            user: user
          });
        }
        return res.redirect('/users/Sing-in');
      } else {
        return res.redirect('/users/Sing-in');
      }
    } catch (err) {
      console.log('Error:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
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
module.exports.CreateSession = async (req,res) => {
       try{
            const user = await User.findOne({ email: req.body.email }).exec();
            if(!user){
                return res.redirect('back');
            }else{
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile')
            }
       }catch(err){
        console.log('Error: ', err.message);
        return res.status(500).json({error: 'server error'});
       }
}

// for sing-out
module.exports.Singout = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/Sing-in')
}
