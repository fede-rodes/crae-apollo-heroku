const send = require('./send');

const pushAPI = {};

//------------------------------------------------------------------------------
pushAPI.send = async (args) => {
  await send(args);
};
//------------------------------------------------------------------------------

module.exports = pushAPI;
