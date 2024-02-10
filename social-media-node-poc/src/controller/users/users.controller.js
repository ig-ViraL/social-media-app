const Users = require("../../model/users.model");
const Follower = require("../../model/follower.model");
const Post = require("../../model/posts.model");
const Joi = require("joi");
const conversation = require("../../model/conversation.model");
const Message = require("../../model/message.model");

/**
 * get user profile
 */
async function getUserProfile(req, res) {
  try {
    const userId = req.user.user_id;
    const findUser = await Users.findOne(
      { _id: userId },
      { password: 0, otp: 0, optExpiredAt: 0 }
    );
    const getFollower = await Follower.find({
      followingId: userId,
      isAccepted: true,
    });
    const getFollowing = await Follower.find({
      followerId: userId,
      isAccepted: true,
    });
    let userJson = findUser.toJSON();
    userJson.totalFollower = getFollower.length;
    userJson.follower = getFollower;
    userJson.totalFollowing = getFollowing.length;
    userJson.following = getFollowing;
    return res.send({
      success: true,
      data: userJson,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * update profile
 */
async function updateProfile(req, res) {
  try {
    const userId = req.user.user_id;

    // delete major field
    delete req.body.email;
    delete req.body.password;
    delete req.body.otp;
    delete req.body.optExpiredAt;
    delete req.body.isVerified;

    // if user want update username
    if (req.body.username) {
      const findUsername = await Users.findOne({
        username: req.body.username,
        _id: { $ne: userId },
      });
      if (findUsername) {
        return RESPONSE.error(res, "This username is taken by someone.", 402);
      }
    }
    await Users.updateOne({ _id: userId }, req.body);
    const findUpdatedUser = await Users.findOne(
      { _id: userId },
      { password: 0, otp: 0, optExpiredAt: 0 }
    );
    return res.send({
      success: true,
      data: findUpdatedUser,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * show user profile
 */
async function showUserProfile(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      userId: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.query);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }

    const { userId } = req.query;
    const getUserProfile = await Users.findOne({ _id: userId });
    if (!getUserProfile) {
      return RESPONSE.error(res, "Searched user not found.", 404);
    }
    const { firstname, lastname, username, isPrivate } = getUserProfile;
    const getFollower = await Follower.find({
      followingId: userId,
      isAccepted: true,
    });
    const getFollowing = await Follower.find({
      followerId: userId,
      isAccepted: true,
    });
    const responseData = {
      firstname,
      lastname,
      username,
      isPrivate,
      totalFollower: getFollower.length,
      totalFollowing: getFollowing.length,
      follower: getFollower,
      following: getFollowing,
    };
    if (!getUserProfile.isPrivate) {
      responseData.follower = getFollower;
      responseData.following = getFollowing;
    }
    return res.send({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * follow user
 */
async function followUser(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }

    const followerId = req.user.user_id;
    const followingId = req.body.id;

    const isExist = await Follower.findOne({ followerId, followingId });
    if (isExist) {
      return res.send({
        success: true,
        data: isExist,
        message: isExist.isAccepted
          ? "You already followed this user."
          : "You have already sended follow request.",
      });
    }
    const checkPrivate = await Users.findOne({ _id: followingId });
    if (checkPrivate.isPrivate) {
      const followedUser = await Follower.create({
        followerId,
        followingId,
        isAccepted: false,
      });
      return res.send({
        success: true,
        data: followedUser,
      });
    }
    const followedUser = await Follower.create({
      followerId,
      followingId,
      isAccepted: true,
    });
    return res.send({
      success: true,
      data: followedUser,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * follow user
 */
async function followUserSocket(data) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      followingId: Joi.string().required(),
      followerId: Joi.string().required(),
    });
    const { error } = validationSchema.validate(data);
    if (error) {
      return {
        status: false,
        message: error.details[0].message,
      };
    }

    const { followerId, followingId } = data;
    if (followingId === followerId) {
      return {
        status: false,
        message: "You can't follow yourself, please check followingId.",
      };
    }

    const isExist = await Follower.findOne({ followerId, followingId });
    if (isExist) {
      if (isExist.isAccepted) {
        return {
          status: true,
          message: "You already follwed this user.",
          data: isExist,
        };
      }
      return {
        status: true,
        message: "You have already sent follow request.",
        data: isExist,
      };
    }
    const checkPrivate = await Users.findOne({ _id: followingId });
    if (checkPrivate.isPrivate) {
      const followuser = await Follower.create({
        followerId,
        followingId,
        isAccepted: false,
      });
      return {
        status: true,
        message: "You have successfully sent follow request.",
        data: followuser,
      };
    }
    const followUser = await Follower.create({
      followerId,
      followingId,
      isAccepted: true,
    });
    const fineFollowerUserProfile = await Users.findOne(
      { _id: followUser.followerId },
      {
        _id: 1,
        firstname: 1,
        lastname: 1,
        username: 1,
        email: 1,
        isPrivate: 1,
      }
    );
    return {
      followerUser: {
        status: true,
        message: "You have successfully followed this user.",
        data: followUser,
      },
      followingUser: {
        status: true,
        message: "You got new follow request.",
        data: fineFollowerUserProfile,
      },
    };
  } catch (error) {
    console.log("error:", error);
    return {
      status: false,
      message: "Internal server error.",
    };
  }
}

/**
 * get follow requestes
 */
async function getFollowRequests(req, res) {
  try {
    const followingId = req.user.user_id;
    const getRequests = await Follower.find({ followingId, isAccepted: false });
    return res.send({
      success: true,
      data: getRequests,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * accept follow request
 */
async function acceptFollowRequest(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }
    const followerId = req.body.id;
    const followingId = req.user.user_id;

    const findFollowRequest = await Follower.findOne({
      followerId,
      followingId,
      isAccepted: false,
    });
    if (!findFollowRequest) {
      return RESPONSE.error(
        res,
        "You do not have pending request from this user",
        400
      );
    }
    await Follower.updateOne({ followerId, followingId }, { isAccepted: true });
    const getAcceptRequestData = await Follower.findOne({
      followerId,
      followingId,
      isAccepted: true,
    });
    return res.send({
      success: true,
      data: getAcceptRequestData,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * unfollow user
 */
async function unfollowUser(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return RESPONSE.error(res, error?.details?.[0]?.message, 400);
    }

    const followingId = req.body.id;
    const followerId = req.user.user_id;
    await Follower.findOneAndDelete({
      followerId,
      followingId,
    });
    return res.send({
      success: true,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * get all users
 */
async function getAllUsers(req, res) {
  try {
    let { pageSize, pageNumber } = req.query;
    pageNumber = pageNumber !== 0 && pageNumber ? pageNumber - 1 : 0;
    pageSize = pageSize ?? 5;
    const findObj = { isVerified: true };
    if (req.query.searchText) {
      findObj["$or"] = [
        { firstname: { $regex: req.query.searchText, $options: "i" } },
        { lastname: { $regex: req.query.searchText, $options: "i" } },
        { email: { $regex: req.query.searchText, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex: req.query.searchText,
              options: "i",
            },
          },
        },
      ];
    }
    const getUsers = await Users.find(findObj, {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1,
      isPrivate: 1,
    })
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .sort({ created_at: "desc" });
    return res.send({
      success: true,
      data: getUsers,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

/**
 * delete user
 */
async function deleteUser(req, res) {
  try {
    const userId = req.user.user_id;
    await Users.deleteMany({ _id: userId });
    await Post.deleteMany({ userId });
    const getConversationIds = await conversation.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    });
    let idsArr = getConversationIds.map((val) => val._id);
    await Message.deleteMany({ conversationId: { $in: idsArr } });
    await conversation.deleteMany({
      $or: [{ userOne: userId }, { userTwo: userId }],
    });
    await Follower.deleteMany({
      $or: [{ followerId: userId }, { followerId: userId }],
    });
    return res.send({
      success: true,
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

module.exports = {
  getUserProfile,
  updateProfile,
  showUserProfile,
  followUser,
  getFollowRequests,
  acceptFollowRequest,
  unfollowUser,
  followUserSocket,
  getAllUsers,
  deleteUser,
};
