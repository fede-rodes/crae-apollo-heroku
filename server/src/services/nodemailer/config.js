const nodemailer = require('nodemailer');

/**
 * @see {@link }
 * @see {@link }
 */

const {
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_PORT,
} = process.env;

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

module.exports = {
  nodemailer,
  transporter,
};
