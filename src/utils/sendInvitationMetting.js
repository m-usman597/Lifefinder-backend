const nodemailer = require("nodemailer");
const { Google_App_Password } = require("../config");

const sendEmail = async (to, subject, emailType, meetingDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "muhammadyameen5432@gmail.com",
      pass: Google_App_Password,
    },
  });

  const { date, time, day, year, hospitalName, patientName, session_id } =
    meetingDetails;

  let htmlContent;

  if (emailType === "patient") {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0;">Life-Finder</h2>
        <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Hello ${patientName},</p>
        <p style="font-size: 16px; color: #333;">You have a new meeting scheduled with ${hospitalName}. Here are the details:</p>
        <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
        <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
        <p style="font-size: 16px; color: #333;"><strong>Meeting ID:</strong> ${session_id}</p>
        <p style="font-size: 16px; color: #333;">Please be on time for your appointment.</p>
        <a href="https://life-finder.vercel.app/room" style="display: inline-block; background-color: #1daefd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Join Meeting</a>
        <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 20px; color: #1daefd;">Thank you!</p>
        <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
      </div>
    `;
  } else if (emailType === "hospital") {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0;">Life-Finder</h2>
        <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Dear ${hospitalName},</p>
        <p style="font-size: 16px; color: #333;">You have a new meeting scheduled with ${patientName}. Here are the details:</p>
        <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
        <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
        <p style="font-size: 16px; color: #333;"><strong>Meeting ID:</strong> ${session_id}</p>
        <p style="font-size: 16px; color: #333;">Please be on time for your appointment.</p>
        <a href="https://life-finder.vercel.app/room" style="display: inline-block; background-color: #1daefd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Join Meeting</a>
        <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 20px; color: #1daefd;">Thank you!</p>
        <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
      </div>
    `;
  } else {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="background-color: #000949; color: white; text-align: center; padding: 10px 0; margin: 0;">Life-Finder</h2>
        <p style="font-size: 20px; font-weight: bold; color: #1daefd;">Hello,</p>
        <p style="font-size: 16px; color: #333;">Please verify your account with the following details:</p>
        <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${day}, ${date} ${year}</p>
        <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${time}</p>
        <p style="font-size: 16px; color: #333;"><strong>Session ID:</strong> ${session_id}</p>
        <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
        <a href="https://life-finder.vercel.app/room" style="display: inline-block; background-color: #1daefd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Account</a>
        <p style="font-size: 20px; color: #1daefd;">Thank you!</p>
        <p style="font-size: 16px; color: #333;">The Life-Finder Team</p>
      </div>
    `;
  }

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
