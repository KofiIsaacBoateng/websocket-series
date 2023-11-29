const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    groupChat: {
      type: Boolean,
      default: false,
    },
    recent: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chatSchema.virtual("messages", {
  ref: "Message",
  foreignField: "chatId",
  localField: "_id",
});

chatSchema.pre(/^find/, function (next) {
  this.populate("users").populate("recent");
});

module.exports = mongoose.model("Chat", chatSchema);
