/* const express = require('express');
const pick = require('lodash/pick');
const { User, validNewUser } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const { email } = pick(data, ['email']);

  const { error } = validNewUser({ email });
  if (error) {
    console.error(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user doesn't exist already
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send('Email registered already'); // Bad request
    return;
  }

  try {
    const newUser = new User({ email });
    await newUser.save();
    res.status(200).send(pick(newUser, ['_id'])); // Success request
  } catch (exc) {
    console.log(exc);
    res.status(500); // Server error
  }
});

module.exports = router;
*/