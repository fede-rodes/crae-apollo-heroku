const mongoose = require('mongoose');

// Mongoose schema and model
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    index: true,
  },
  endpoint: {
    type: String,
  },
  keys: {
    auth: {
      type: String,
    },
    p256dh: {
      type: String,
    },
  },
});

const Subscription = mongoose.model('Subscription', schema);

module.exports = Subscription;
