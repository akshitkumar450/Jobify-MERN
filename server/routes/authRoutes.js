import express from "express";
const router = express.Router();
import { login, register, updateuser } from "../controllers/authControllers.js";
import protect from "../middlewares/authMiddleware.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateuser").patch(protect, updateuser);

export default router;
