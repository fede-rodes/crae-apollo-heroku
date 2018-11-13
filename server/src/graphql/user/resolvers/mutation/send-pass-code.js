const { nodemailer, transporter } = require('../../../../services/nodemailer/config');
const { User } = require('../../../../models');

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
  const user = await User.findOne({ email });

  if (!user) {
    // return { status: 500 };
    throw new Error('User not found');
  }

  // Genearte a 6-digit pass code and attach it to the user
  const passCode = await user.genPassCode(6);

  // Send pass code to user
  const mailOptions = {
    from: 'email@example.com', // sender address
    to: email, // list of receivers
    subject: `Your pass code is ${passCode} for <siteName>`, // Subject line
    text: getText({ passCode }), // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // Send email with defined transport object
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
