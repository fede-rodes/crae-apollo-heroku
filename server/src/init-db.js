const casual = require('casual');
const times = require('lodash/times');
const { User, Author, Post } = require('./models');

// Clear DB
const clearAll = async () => {
  await User.remove({});
  await Author.remove({});
  await Post.remove({});
};

// Insert a dummy user to simulate current user is logged in
const initUser = async () => {
  const user = await User.findOne({}).exec();

  // Insert a user in case users collection is empty
  if (user) {
    console.log('\nTest user already exists!');
    return;
  }

  // Insert test user
  const firstUser = new User({});

  try {
    await firstUser.save();
    console.log('\nFirst user inserted!');
  } catch (exc) {
    console.log(exc);
  }
}

// Populate DB.
const fixtures = () => {
  casual.seed(11);

  times(10, async () => {
    const author = new Author({
      firstName: casual.first_name,
      lastName: casual.last_name,
    });

    try {
      await author.save();
      console.log('\nNew author inserted!');
    } catch (exc) {
      console.log(exc);
    }

    const post = new Post({
      authorId: author._id,
      title: `A post by ${author.firstName}`,
      text: casual.sentences(3),
    });

    try {
      await post.save();
      console.log('\nNew post inserted!');
    } catch (exc) {
      console.log(exc);
    }
  });
};

const initDB = async () => {
  // Clear Author and Post collections
  await clearAll();
  // Insert current user
  // await initUser();
  // Set some initial data
  await fixtures();
};

module.exports = initDB;
