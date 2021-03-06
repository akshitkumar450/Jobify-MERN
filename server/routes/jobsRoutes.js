import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  jobById,
  showStats,
  updateJob,
} from "../controllers/jobsControllers.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(protect);

router.route("/").post(createJob).get(getAllJobs);
// place before :id
router.route("/stats").get(showStats);
router.route("/:id").get(jobById).delete(deleteJob).patch(updateJob);

export default router;
