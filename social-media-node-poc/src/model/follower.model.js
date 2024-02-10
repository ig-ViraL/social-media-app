const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

followerSchema.method("toJSON", function () {
  const { _v, ...object } = this.toObject();
  // delete object.password;
  return object;
});

const follower = mongoose.model("followers", followerSchema);
module.exports = follower;
