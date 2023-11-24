const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
      required: [true, "message must belong to a chat"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

messageSchema.pre(/^find/, function (next) {
  this.populate("sender");
  this.populate("receiver");
  next();
});

module.exports = mongoose.model("Message", messageSchema);
