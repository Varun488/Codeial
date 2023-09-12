const Comment = require('../models/comments')
const post = require('../models/post');


module.exports.create = async function(req, res) {
    try {
        const foundPost = await post.findById(req.body.post);
        
        if (foundPost) {
            const createdComment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user.id // Assuming req.user contains the authenticated user
            });

            foundPost.comments.push(createdComment);
            await foundPost.save();

            return res.redirect('/');
        }
    } catch (err) {
        console.log('Error in creating comment:', err);
        return res.status(500).json({ error: 'Error creating comment' });
    }
};

module.exports.destroy = async function(req, res) {
    try {
      const comment = await Comment.findById(req.params.id).exec();
  
      if (!comment) {
        return res.redirect('back'); // Comment not found
      }
  
      if (comment.user == req.user.id) {
        const postId = comment.post;
  
        await Comment.deleteOne({ _id: req.params.id }).exec();
  
        await post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
        
        return res.redirect('back'); // Successfully deleted the comment
      } else {
        return res.redirect('back'); // User is not authorized to delete the comment
      }
    } catch (err) {
      console.error(err);
      return res.redirect('back'); // Handle any errors that may occur
    }
  };