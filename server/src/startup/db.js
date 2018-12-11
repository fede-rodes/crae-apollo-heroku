/* eslint-disable func-names */
const mongoose = require('mongoose');
const fixtures = require('../fixtures');

const { MONGO_URL } = process.env;

console.log('\nprocess.env.MONGO_URL', MONGO_URL);

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
// OBS: don't catch error here. Let mongoose to throw so that we catch the exception using winston
// db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Clean and populate DB
fixtures();

// Required for graphql to properly parse ObjectId
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
