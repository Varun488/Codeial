const comment = require('../models/comments')
const post = require('../models/post');


module.exports.create = async function(req, res) {
    try {
        const foundPost = await post.findById(req.body.post);
        
        if (foundPost) {
            const createdComment = await comment.create({
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