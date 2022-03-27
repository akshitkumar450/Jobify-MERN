import Job from "../models/jobModel.js";

export const getAllJobs = async (req, res) => {
  const id = req.userId;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skipVal = (page - 1) * limit;
  try {
    // to get the jobs for the logged in user only
    const totalJobs = await Job.find({ createdBy: id });
    const jobs = await Job.find({ createdBy: id }).skip(skipVal).limit(limit);
    res.status(200).json({
      status: "success",
      jobs,
      totalJobs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "no Data found",
    });
  }
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  try {
    if (!company || !position) {
      throw new Error("Provide all values");
    }
    const createdJob = await Job.create({ ...req.body, createdBy: req.userId });
    res.status(201).json({
      status: "success",
      job: createdJob,
    });
  } catch (err) {
    let errorMsg = err.message || "something went wrong";
    if (err.name === "ValidationError") {
      errorMsg = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
    }
    res.status(400).json({
      status: "fail",
      message: errorMsg,
    });
  }
};

export const jobById = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);
    if (job) {
      res.status(200).json({
        status: "success",
        job,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "no data ",
    });
  }
};

export const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    if (!jobId) {
      throw new Error("please give id");
    }
    const jobToBeDelete = await Job.findById(jobId);
    if (!jobToBeDelete) {
      throw new Error("No job found");
    }
    const deletedJob = await Job.findByIdAndDelete(jobId);
    res.status(200).json({
      status: "success",
      job: deletedJob,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    if (!jobId) {
      throw new Error("please give id");
    }
    const jobToBeUpdate = await Job.findById(jobId);
    if (!jobToBeUpdate) {
      throw new Error("No job found");
    }
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      job: updatedJob,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const showStats = (req, res) => {
  res.send("stats");
};
