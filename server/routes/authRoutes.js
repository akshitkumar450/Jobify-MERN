import express from "express";
const router = express.Router();
import { login, register, updateuser } from "../controllers/authControllers.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateuser").patch(updateuser);

export default router;
