

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    postName : String,
    postNo : Number,
    postView : Number,
    postAuthor : String,
    postRate : Number,
    postDate : String,
    postComment : Number,
    postContents : String
});

module.exports = mongoose.model('post', postSchema);