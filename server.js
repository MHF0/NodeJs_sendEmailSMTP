const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const sendEmail = async (req, res) => {
  const { email, subject, message, who, name } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        who == "mhamadhfarhan@gmail.com"
          ? "mhamadhfarhan@gmail.com"
          : "mahdiayyad97@gmail.com",
      pass:
        who == "mhamadhfarhan@gmail.com"
          ? process.env.MAIL_PASS_FARHAN
          : process.env.MAIL_PASS_MAHDI,
    },
  });

  const mailOptions = {
    from: email,
    to:
      who == "mhamadhfarhan@gmail.com"
        ? "mhamadhfarhan@gmail.com, moh.hesham.f@gmail.com"
        : "mahdiayyad97@gmail.com",
    subject: `From Portfolio. => ${email}`,
    html: `
    <b> Subject is: </b> ${subject} <br/>

      <b>Name: </b> ${name}<br/>
    
      <b>Message is</b> ${message}`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: "Email sent",
  });
};

app.post("/api/sendEmail", sendEmail);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
