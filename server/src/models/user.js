const mongoose = require('mongoose');

const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', schema);

module.exports = User;
