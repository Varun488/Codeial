const Post = require('../models/post');

module.exports.post = function(req,res){
    res.end('<h1>This is our post page</h1>');
}

module.exports.createpost = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        // Handle the successful creation of the post
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating post:', err);
        return res.status(500).json({ error: 'Error creating post' });
    }
};
