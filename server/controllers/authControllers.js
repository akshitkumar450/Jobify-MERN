import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new Error("email already in use");
    }
    if (!name || !email || !password) {
      throw new Error("Please provide all values");
    }
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, "super-secret", {
      expiresIn: "2d",
    });
    res.status(201).json({
      status: "success",
      user,
      token,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // to select the password explicitlity as we have select:false in model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("No email found");
    }
    if (!email || !password) {
      throw new Error("Please provide all values");
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = jwt.sign({ id: user._id }, "super-secret", {
        expiresIn: "1d",
      });
      res.status(201).json({
        status: "success",
        user,
        token,
      });
    } else {
      throw new Error("email or password do not match");
    }
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

export const updateuser = async (req, res) => {
  // console.log(req.userId);
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("no user found");
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      status: "success",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
