import Job from "../models/jobModel.js";
import mongoose from "mongoose";
import moment from "moment";

export const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;
  console.log(req.query);
  try {
    // to get the jobs for the logged in user only
    const queryObj = { createdBy: req.userId };

    if (status && status !== "all") {
      queryObj.status = status;
    }

    if (jobType && jobType !== "all") {
      queryObj.jobType = jobType;
    }

    // search
    if (search && search !== "") {
      // i -> case insensitive
      // text exist in general (not exact match)
      queryObj.position = { $regex: search, $options: "i" };
    }

    let result = Job.find(queryObj);

    // sorting
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }

    // pagination
    let page, limit, skipVal;
    // if (req.query.page >= 0) {
    page = req.query.page * 1 || 1;
    limit = req.query.limit * 1 || 2;
    skipVal = (page - 1) * limit;
    // }

    const jobs = await result.skip(skipVal).limit(limit);

    const totalJobs = await Job.countDocuments(queryObj);

    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(200).json({
      status: "success",
      jobs,
      totalJobs,
      numOfPages,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "no Jobs found",
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
    // make sure only logged in user matches the goal user
    if (jobToBeDelete.createdBy.toString() !== req.userId.toString()) {
      throw new Error("you can not delete this job");
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
    // console.log(req.userId, jobToBeUpdate.createdBy);
    if (!jobToBeUpdate) {
      throw new Error("No job found");
    }
    // make sure only logged in user matches the goal user
    if (jobToBeUpdate.createdBy.toString() !== req.userId.toString()) {
      throw new Error("you can not update this job");
    }
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      // job: updatedJob,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const showStats = async (req, res) => {
  try {
    let stats = await Job.aggregate([
      // to filter out the jobs for a logged in user
      { $match: { createdBy: mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    // tranforming data as a object instead of an array
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    // refactor our data to be used effectively in frontend
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        // accepts 0-11
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();

    // if user has no jobs (default stats)
    const finalStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    res.status(200).json({
      status: "success",
      stats: finalStats,
      monthly: monthlyApplications,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
