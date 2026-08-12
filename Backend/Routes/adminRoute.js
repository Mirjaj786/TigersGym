import express from "express";
const router = express.Router();

import {
    login,
    register,
    logout,
    getMe,
} from "../Controllers/adminController.js";
import { forgotPass, resetPassword } from "../Controllers/passwordController.js";
import { protectAdmin } from "../Middlewares/authMiddleware.js";

// router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forget-password").post(protectAdmin, forgotPass);
router.route("/reset-password/:token").post(protectAdmin, resetPassword);
router.route("/logout").get(protectAdmin, logout);
router.route("/me").get(protectAdmin, getMe);

export default router;
