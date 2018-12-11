const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('.');

const { JWT_PRIVATE_KEY } = process.env;

describe('user.genAuthToken', () => {
  it('should generate a valid JSON Web Token', () => {
    const _id = mongoose.Types.ObjectId().toHexString();
    // OBS: new User({...}) doesn't save the user into the DB, only in memory
    const user = new User({ _id, email: 'email@example.com' });
    // Don't call user.save() to avoid storing data into DB
    const token = user.genAuthToken();
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    expect(decoded).toMatchObject({ _id });
  });
});
