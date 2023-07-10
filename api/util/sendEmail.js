const nodemailer = require('nodemailer');
const emailConfig = require('./emailconfig');

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter with the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Send mail with defined transport object
    await transporter.sendMail({
      from: emailConfig.auth.user,
      to,
      subject,
      text
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = { sendEmail };
