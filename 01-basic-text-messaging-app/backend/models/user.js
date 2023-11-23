const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [20, "name must not be more than 20 characters"],
    },

    username: {
      type: String,
      minLength: [4, "username must be at least 4 characters"],
      maxLength: [20, "username must not be above 20 characters"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at least 8 characters"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at least 8 characters"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
      },
    },
    profile: String,
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
    virtuals: true,
  }
);

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// document middleware
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined;
  next();
});

// query middlewares

// aggregate middlewares

module.exports = mongoose.model("User", userSchema);
