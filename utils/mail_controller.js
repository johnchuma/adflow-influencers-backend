const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Add this line
  },
});

const sendOTPEmail = ({ to, username, otp, subject }) => {
  try {
    const templatePath = path.join(__dirname, "otp.ejs");
    const emailParams = {
      from: "AdFlow",
      to: to,
      subject: subject,
      html: ejs.render(fs.readFileSync(templatePath, "utf8"), {
        email: to,
        otp: otp,
        name: username,
      }),
    };
    const response = transporter.sendMail(emailParams);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const sendNewMessageAlert = ({ to, username,subject }) => {
  try {
    const templatePath = path.join(__dirname, "new_message_alert.ejs");
    const emailParams = {
      from: "AdFlow",
      to: to,
      subject: subject,
      html: ejs.render(fs.readFileSync(templatePath, "utf8"), {
        email: to,
        name: username,
      }),
    };
    const response = transporter.sendMail(emailParams);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendOTPEmail,sendNewMessageAlert };
