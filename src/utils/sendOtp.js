const nodemailer = require("nodemailer");
const { Google_App_Password } = require("../config");

const sendEmail = async (to, subject, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "muhammadyameen5432@gmail.com",
      pass: Google_App_Password,
    },
  });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
  <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0;">Life-Finder</h2>
  <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Hello,</p>
  <p style="font-size: 16px; color: #333;">Please verify your account to update your password:</p>
  <p style="font-size: 24px; font-weight: bold; color: #000949; text-align: center; margin: 20px 0;">${otp}</p>
  <p style="font-size: 16px; color: #333;">Use this code to complete your verification.</p>
  <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
  <p style="font-size: 20px; color: #1daefd;">Thank you!</p>
  <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
</div>

  `;

  let mailOptions = {
    from: "muhammadyameen5432@gmail.com",
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
