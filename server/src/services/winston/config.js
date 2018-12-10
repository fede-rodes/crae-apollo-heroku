const winston = require('winston');
require('winston-mongodb');

/**
 * @see {@link }
 * @see {@link }
 */

const { MONGO_URL } = process.env;

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db: MONGO_URL }),
  ],
});

module.exports = {
  winston,
  logger,
};
