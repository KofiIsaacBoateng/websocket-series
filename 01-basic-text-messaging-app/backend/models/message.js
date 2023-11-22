const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
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

module.exports = mongoose.model("Message", userSchema);
