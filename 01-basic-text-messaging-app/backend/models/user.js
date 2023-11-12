const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
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
    },

    passwordConfirm: {
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

module.exports = mongoose.model("Chat", userSchema);
