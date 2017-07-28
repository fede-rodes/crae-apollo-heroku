import mongoose from 'mongoose';

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
});

const Author = mongoose.model('Author', schema);

export default Author;
