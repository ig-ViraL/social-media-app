const Jwt = require("jsonwebtoken");
const ChatController = require("../controller/users/chat.controller");
const UserController = require("../controller/users/users.controller");

async function initializeSocketIO(io) {
  // initialize blank error for store online users
  let users = [];

  // adding users when socket will connected
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  // remove user when socket will disconnected
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  // get user when we want to find it's socket id
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  // middleware for socket.io
  io.use((socket, next) => {
    const token = socket.handshake.headers.token ?? null;
    Jwt.verify(token, process.env.JWT_SECURE_KEY, function (err, decoded) {
      if (err) {
        // console.log("socket error:",err);
        next(new Error("Socket authentication error"));
      } else {
        socket.userId = decoded.user_id;
        next();
      }
    });
  });

  // socket connection
  io.on("connection", (socket) => {
    // when connect user
    addUser(socket.userId, socket.id);
    console.log("User connected!");

    // 1. send message
    socket.on("sendMessage", async ({ receiverId, content }) => {
      const data = {
        senderId: socket.userId,
        receiverId,
        content,
      };
      const getSendedMessage = await ChatController.sendMessage(data);
      const user = getUser(receiverId);
      if (user?.socketId) {
        io.to(user.socketId).emit("getMessage", getSendedMessage);
      }
      io.to(socket.id).emit("getMessage", getSendedMessage);
    });

    // 2. follow user
    socket.on("followUser", async ({ followingId }) => {
      const data = {
        followerId: socket.userId,
        followingId: followingId,
      };
      const getResponse = await UserController.followUserSocket(data);
      const user = getUser(followingId);
      if (user?.socketId) {
        io.to(user.socketId).emit(
          "getFollowRequest",
          getResponse.hasOwnProperty("followingUser")
            ? getResponse.followingUser
            : getResponse
        );
      }
      io.to(socket.id).emit(
        "getFollowRequest",
        getResponse.hasOwnProperty("followerUser")
          ? getResponse.followerUser
          : getResponse
      );
    });

    //when disconnect
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("User disconnected!");
    });
  });
}

module.exports = initializeSocketIO;
