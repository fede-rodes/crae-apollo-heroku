/* const express = require('express');
const pick = require('lodash/pick');
const { User, validLogin } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const { email, passCode } = pick(data, ['email', 'passCode']);

  const { error } = validLogin({ email, passCode });
  if (error) {
    console.error(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user exists and pass code is valid
  const user = await User.findOne({ email });
  if (!user || !user.validPassCode({ passCode })) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  // Check pas code expiration date
  if (user.passCodeExpired()) {
    res.status(400).send('Pass code has expired'); // Bad request
    return;
  }

  // Set email to verifield
  await user.setEmailToVerified();

  const token = user.genAuthToken();
  res.header('x-auth-token', token).status(200).send(pick(user, ['_id'])); // Success request
});

module.exports = router; */
