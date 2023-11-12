const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
    virtuals: true,
  }
);

module.exports = mongoose.model("User", userSchema);
