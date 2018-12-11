const { logger } = require('../startup/logger');

const errorHandling = (exc, req, res, next) => {
  logger.error(exc.message || 'No msg field');
  console.log('CATCH ALL ERRORS');
  res.status(500).send('Something failed');
  next();
};

module.exports = errorHandling;
