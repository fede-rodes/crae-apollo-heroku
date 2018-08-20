const nodemailer = require('nodemailer');
const { User, PassCode, genPassCode } = require('../../../../models');

const {
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_PORT,
} = process.env;

if (
  !SMTP_HOST || SMTP_HOST.length === 0
  || !SMTP_USERNAME || SMTP_USERNAME.length === 0
  || !SMTP_PASSWORD || SMTP_PASSWORD.length === 0
  || !SMTP_PORT || SMTP_PORT.length === 0
) {
  console.error('FATAL ERROR: SMTP env vars missing');
  process.exit(1);
}

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
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getText = ({ passCode }) => (`
Hello,

Your verification code is ${passCode}.

Thanks.
`);
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const sendPassCode = async (root, args) => {
  const { email } = args;

  // Is there any user associated to this email?
  const userExists = !!(await User.findOne({ email }));

  // If no, create a new user record before sending the pass code
  if (!userExists) {
    try {
      const user = new User({ email });
      await user.save();
    } catch (exc) {
      console.log(exc);
      return { status: 500 };
    }
  }

  // Genearte a 6-digit pass code and store it into DB
  const passCode = genPassCode(6);
  console.log('passCode', passCode);

  try {
    const record = await PassCode.findOneAndUpdate(
      { email },
      { $set: { passCode } },
      { upsert: true, new: true },
    );
    console.log('record', record);
  } catch (exc) {
    console.error(exc);
  }

  // Send pass code to user
  const mailOptions = {
    from: 'email@example.com', // sender address
    to: email, // list of receivers
    subject: `Your pass code is ${passCode} for <siteName>`, // Subject line
    text: getText({ passCode }), // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return { status: 200 };
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (exc) {
    console.error('ERROR DELIVERYING EMAIL', exc);
    return { status: 500 };
  }
};

module.exports = sendPassCode;
