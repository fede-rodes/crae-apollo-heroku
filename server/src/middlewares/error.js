const { logger } = require('../services/winston/config');

const errorHandling = (exc, req, res, next) => {
  logger.error(exc.message || 'No msg field', console.log);
  res.status(500).send('Something failed');
  next();
};

module.exports = errorHandling;
