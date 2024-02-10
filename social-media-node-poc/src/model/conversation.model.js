const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    userOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

conversationSchema.method("toJSON", function () {
  const { _v, ...object } = this.toObject();
  // delete object.password;
  return object;
});

const conversation = mongoose.model("conversations", conversationSchema);
module.exports = conversation;
