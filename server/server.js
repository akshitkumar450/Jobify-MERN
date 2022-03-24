import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
import cors from "cors";
const app = express();
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import { NotFound } from "./middlewares/NotFound.js";
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB();

// api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobsRoutes);

// not found page
app.use(NotFound);

app.listen(5000, () => {
  console.log("server running");
});
