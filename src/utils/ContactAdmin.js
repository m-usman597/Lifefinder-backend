const nodemailer = require("nodemailer");
const { Google_App_Password } = require("../config");

const ContactUs = async(name,email,status,message,subject) =>{

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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: white; background-color: #000949; text-align: center; padding: 10px; border-radius: 5px;">User Message</h2>
      <p style="font-size: 16px; margin-bottom: 10px;"><strong>Name:</strong> <span style="color: #000949;">${name}</span></p>
      <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> <span style="color: #000949;">${email}</span></p>
      <p style="font-size: 16px; margin-bottom: 10px;"><strong>Status:</strong> <span style="color: #000949;">${status}</span></p>
      <p style="font-size: 16px; margin-bottom: 10px;"><strong>Message:</strong></p>
      <p style="font-size: 16px; background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #555; text-align: center;">This email was sent from your website's contact form.</p>
      </div>
    `;

      let mailOptions = {
        from: email,
        to: "arsaljawed9999@gmail.com",
        subject: subject,
        html: htmlContent,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
}

module.exports = ContactUs;