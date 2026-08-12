import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../Models/adminModels.js";
import validator from "validator";
import jwt from "jsonwebtoken";


const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please provide the name!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email!" });
    }
    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid Phone number!" });
    }
    const userExist = await User.findOne({
      email: email,
      phone: phone,
    });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(15);
    const hassPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hassPass,
    });

    await newUser.save();

    const token = createToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while register : ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid Email!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found at this email !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Worng parrword!" });
    }
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Login Successfull",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while Login : ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.admin.userId || req.admin._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while Logout : ${error.message}` });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.admin.userId || req.admin._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found!" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while getMe : ${error.message}` });
  }
};
