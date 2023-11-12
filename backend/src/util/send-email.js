import constants from '@/config/constants';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: constants.MAIL_HOST,
  port: constants.MAIL_PORT,
  auth: {
    user: constants.MAIL_USER,
    pass: constants.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const readHtmlFile = (fileName) => {
  return fs.readFileSync(
    path.join(__dirname, fileName),
    'utf8',
    (err, html) => {
      if (err) {
        throw err;
      }
      return html;
    }
  );
};

const sendForgotPasswordEmail = async (email, resetToken) => {
  const clientDomain = constants.CLIENT_DOMAIN;
  const resetUrl = `${clientDomain}/auth/reset-password?token=${resetToken}`;

  let htmlContent = readHtmlFile('../../assets/forgot-password.html');
  htmlContent = htmlContent.replace('{{resetUrl}}', resetUrl);

  const mailOptions = {
    from: constants.MAIL_USER,
    to: email,
    subject: 'Reset Password - Spots',
    html: htmlContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export default sendForgotPasswordEmail;
