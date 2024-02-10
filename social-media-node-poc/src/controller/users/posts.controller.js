const Post = require("../../model/posts.model");
const Joi = require("joi");
/**
 * create Post
 */
async function createPost(req, res) {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      isPrivate: Joi.boolean(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }

    const { title, description, isPrivate } = req.body;
    const media_id = req.file?.id;
    const postCreate = await Post.create({
      userId: req.user.user_id,
      title,
      description,
      isPrivate,
      media_id,
    });
    return res.status(201).send({
      data: postCreate,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * get feed
 */
async function getFeedPost(req, res) {
  try {
    // validation schema
    let { pageSize, pageNumber } = req.query;
    pageNumber = pageNumber !== 0 && pageNumber ? pageNumber - 1 : 0;
    pageSize = pageSize ?? 5;
    const findObj = { isPrivate: false };
    if (req.query.search) {
      findObj.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.isMyPostsOnly) {
      const userId = req.user.user_id;
      findObj.userId = userId;
    }
    if (req.query.isPrivate) {
      findObj.isPrivate = req.query.isPrivate == "true";
    }
    const totalPosts = await Post.countDocuments(findObj);
    const getFeedPost = await Post.find(findObj)
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .sort({ created_at: "desc" });
    return res.send({
      data: getFeedPost,
      total: totalPosts,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

module.exports = {
  createPost,
  getFeedPost,
};
