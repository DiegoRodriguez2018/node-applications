const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: Number,
  content: String
}, {collection: 'comment'});

module.exports = mongoose.model('Comment', commentSchema);
