import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
    maxlength: 20,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    require: [true, "email is required"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    minlength: 6,
    require: [true, "password is required"],
  },
  lastName: {
    type: String,
    maxlength: 20,
    minlength: 3,
    default: "lastName",
    trim: true,
  },
  location: {
    type: String,
    default: "los angeles",
    trim: true,
  },
});

const User = mongoose.model("userJob", userSchema);
export default User;
