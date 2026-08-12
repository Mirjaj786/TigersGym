import express from "express";
const router = express.Router();

import { login, register } from "../Controllers/UserController.js";
import { forgotPass, resetPassword } from "../Controllers/passwordController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forget-password").post(forgotPass);
router.route("/reset-password/:token").post(resetPassword)

export default router;
