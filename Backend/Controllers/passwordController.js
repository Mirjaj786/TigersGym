import { User } from "../Models/UserModels.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { sendEmail } from "../Utils/sendEmail.js";
import bcrypt from "bcrypt";

const RESET_TOKEN_EXPIRY = "15m"; // keep this in sync with the email copy below
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const buildResetEmail = (resetLink, name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">Password Reset Request</h2>
    <p>Hello dear <b font-weight: large
    > ${name} </b></p>
    <p>We received a request to reset your password for your TigersGym account. If you didn't make this request, you can safely ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:tomato;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">
      Reset Password
    </a>
    <p style="margin-top: 20px;">Or copy and paste this link into your browser:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
    <p>This link will expire in 15 minutes.</p>
    <p>Best regards,<br/>The TigersGym Team</p>
  </div>
`;

export const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: RESET_TOKEN_EXPIRY,
    });
    const resetLink = `${CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password - TigersGym",
      html: buildResetEmail(resetLink, user.name),
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      token: resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to process forgot password request.",
      error: `Error is ${error.message}`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 15);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "Reset link has expired.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "Invalid reset link.",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Password reset failed.",
    });
  }
};
