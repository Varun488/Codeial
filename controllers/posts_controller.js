const Post = require('../models/post');
const Comment = require('../models/comments');

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


module.exports.deletepost = async function(req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
      if (post.user == req.user.id) {
        await Post.deleteOne({ _id: req.params.id }); // Use deleteOne to delete the post
  
        try {
          await Comment.deleteMany({ post: req.params.id }); // Delete associated comments
          return res.redirect('back');
        } catch (err) {
          console.error('Error deleting comments:', err);
          return res.status(500).json({ error: 'Error deleting comments' });
        }
      } else {
        return res.status(403).json({ error: 'Unauthorized to delete this post' });
      }
    } catch (err) {
      console.error('Error in deleting post:', err);
      return res.status(500).json({ error: 'Error deleting post' });
    }
  };
