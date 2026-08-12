import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
});

try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Tigers Gym" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    // console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};
