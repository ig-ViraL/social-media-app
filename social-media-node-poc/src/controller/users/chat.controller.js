const Joi = require("joi");
const Conversation = require("../../model/conversation.model");
const Message = require("../../model/message.model");
const Follower = require("../../model/follower.model");
const Users = require("../../model/users.model");

// send message
async function sendMessage(data) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      senderId: Joi.string().required(),
      receiverId: Joi.string().required(),
      content: Joi.string().required(),
    });
    const { error } = validationSchema.validate(data);
    if (error) {
      return {
        status: false,
        error: error.details[0].message,
      };
    }

    const { senderId, receiverId, content, media_url } = data;

    // check user is following or not
    // if(!await Follower.findOne({followerId:senderId, followingId:receiverId, isAccepted:true}) && !await Follower.findOne({followerId:receiverId, followingId:senderId, isAccepted:true})){
    //     return {
    //         status:false,
    //         message:"You didn't follow this user."
    //     }
    // }

    // check conversation id is created or not
    let findConversation = await Conversation.findOne({
      $or: [
        { userOne: senderId, userTwo: receiverId },
        { userOne: receiverId, userTwo: senderId },
      ],
    });
    if (!findConversation) {
      findConversation = await Conversation.create({
        userOne: senderId,
        userTwo: receiverId,
      });
    }

    // create message content
    const createMessage = await Message.create({
      senderId,
      receiverId,
      conversationId: findConversation._id,
      content,
      media_url,
    });
    return {
      status: true,
      message: "Message sent.",
      data: createMessage,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      status: false,
      message: "Internal server error.",
    };
  }
}

// get conversation list
async function getConversationsList(req, res) {
  try {
    const userId = req.user.user_id;
    const getList = await Conversation.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    });
    let responseArr = [];
    if (getList?.length) {
      const mapFun = getList.map(async (val) => {
        chatUserId = val.userOne == userId ? val.userTwo : val.userOne;
        const userRes = await Users.findOne(
          { _id: chatUserId },
          {
            _id: 1,
            email: 1,
            firstname: 1,
            lastname: 1,
            username: 1,
            email: 1,
            isPrivate: 1,
          }
        );
        responseArr.push({
          conversationId: val._id,
          chatUser: userRes,
        });
      });
      await Promise.all(mapFun);
    }
    return res.send({ success: true, data: responseArr });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

// get conversation
async function getConversation(req, res) {
  try {
    // validation schema
    const validationSchema = Joi.object({
      conversationId: Joi.string().required(),
      pageNumber: Joi.number(),
      pageSize: Joi.number(),
    });
    const { error } = validationSchema.validate(req.query);
    if (error) {
      return RESPONSE.error(res, error.details[0].message, 400);
    }
    let { conversationId, pageNumber, pageSize } = req.query;
    pageNumber = pageNumber !== 0 && pageNumber ? pageNumber - 1 : 0;
    pageSize = pageSize ?? 10;

    const getTotal = await Message.count({ conversationId });
    const getConversation = await Message.find({ conversationId })
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
    return res.send({
      success: true,
      data: {
        totalPage: Math.ceil(getTotal / pageSize),
        data: getConversation,
      },
    });
  } catch (error) {
    console.log("error:", error);
    return RESPONSE.error(res, "Internal server error.", 500);
  }
}

module.exports = {
  sendMessage,
  getConversation,
  getConversationsList,
};
