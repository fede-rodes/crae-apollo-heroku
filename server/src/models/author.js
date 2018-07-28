const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
});

const Author = mongoose.model('Author', schema);

module.exports = Author;
