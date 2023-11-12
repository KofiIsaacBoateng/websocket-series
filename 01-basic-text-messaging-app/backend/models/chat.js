const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    users: {
      type: [String],
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

// chatSchema.virtual("messages").get()

module.exports = mongoose.model("Chat", chatSchema);
