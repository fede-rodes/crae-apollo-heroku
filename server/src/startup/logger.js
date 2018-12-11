const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const { MONGO_URL } = process.env;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db: MONGO_URL }),
  ],
});

const handleException = async (exc) => {
  await logger.error(exc.message || 'No msg field');
  // TODO: send me an email
  console.log('TODO: SEND EMAIL TO OWNER');
  // Something bad happened, kill the process and then restart fresh
  // TODO: use other winston transports
  process.exit(1);
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleException);

// const p = Promise.reject(new Error('Ive been rejected :('));
// p.then(() => { console.log('done'); });

module.exports = {
  winston,
  logger,
};
