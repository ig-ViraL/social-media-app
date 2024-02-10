const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    optExpiredAt: {
      type: Number,
      required: false,
      // default:Date.now() + 60 * 60 * 1000, // minuter, second, milisecond
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

userSchema.method("toJSON", function () {
  const { _v, ...object } = this.toObject();
  // delete object.password;
  return object;
});

const users = mongoose.model("users", userSchema);
module.exports = users;
