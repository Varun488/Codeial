const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec(); // Use exec() to return a promise

        const users = await User.find({}).exec(); // Use exec() to return a promise

        return res.render('home', {
            title: 'codeial | Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log(err, 'error in showing posts');
    }
}
