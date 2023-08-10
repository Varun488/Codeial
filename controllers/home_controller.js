const Post = require('../models/post')

module.exports.home = async function(req,res){

    try{
        const posts = await Post.find({}).populate('user');
        return res.render('home',{
            title: 'codeial | Home',
            posts: posts
        })
    }catch(err){
         console.log(err, 'error in showing posts');
    }
   
}