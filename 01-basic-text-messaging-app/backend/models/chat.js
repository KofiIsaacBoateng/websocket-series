const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "user",
        },
      ],
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
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
