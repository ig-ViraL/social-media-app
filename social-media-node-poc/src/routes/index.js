const router = require("express").Router();
const middleware = require("../middleware/middleware");

// routes
const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const postRoutes = require("./posts.routes");
const chatRoutes = require("./chat.routes");

// user routes and prefix
router.use("/auth", authRoutes);
router.use("/users", middleware.authUser, usersRoutes);
router.use("/posts", middleware.authUser, postRoutes);
router.use("/chats", middleware.authUser, chatRoutes);

module.exports = router;
