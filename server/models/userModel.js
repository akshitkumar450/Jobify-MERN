import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxlength: 20,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "email is required"],
    validate: {
      validator: validator.isEmail,
      message: "provide a valid email",
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "password is required"],
    // select: false,
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

// it will run create,save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  // this points to userSchema
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("userJob", userSchema);
export default User;
