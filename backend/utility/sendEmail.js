import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Password Reset OTP",
      html: `<h2>Your OTP is ${otp}</h2>`
    });
  }
   catch (error) {
    console.log("Email Error:", error.message);
  }
};

export default sendOtpEmail;