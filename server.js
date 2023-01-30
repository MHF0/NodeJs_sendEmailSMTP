const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mhamadhfarhan@gmail.com",
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "mhamadhfarhan@gmail.com, moh.hesham.f@gmail.com",
    subject: `From Portfolio. => ${email}`,
    html: `<b> Subject is: </b> ${subject} <br/> <b>Message is</b> ${message}`,
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
