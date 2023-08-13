const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
         content: {
            type: String,
            required: true
         },
         user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         },
         Post : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
         },
},{
    timestamps: true
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;