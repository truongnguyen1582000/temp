const nodemailer = require('nodemailer');

const sendMail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '4aa3e8ea4d7710',
      pass: 'a35e6710045a26',
    },
  });

  const mailOpts = {
    from: 'Truong <hello@truong.com',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOpts);
};

module.exports = sendMail;
