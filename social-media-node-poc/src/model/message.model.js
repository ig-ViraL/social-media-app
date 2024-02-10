const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    media_url: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

messageSchema.method("toJSON", function () {
  const { _v, ...object } = this.toObject();
  // delete object.password;
  return object;
});

const message = mongoose.model("messages", messageSchema);
module.exports = message;
