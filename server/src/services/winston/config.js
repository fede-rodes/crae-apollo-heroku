const winston = require('winston');

/**
 * @see {@link }
 * @see {@link }
 */

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});

module.exports = {
  winston,
  logger,
};
