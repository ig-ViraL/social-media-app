const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    media_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      // get: function() {
      //     return this.firstName + ' ' + this.lastName;
      // }
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

postSchema.method("toJSON", function () {
  const { _v, ...object } = this.toObject();
  // delete object.password;
  return object;
});

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
