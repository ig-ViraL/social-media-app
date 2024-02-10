const router = require("express").Router();
const Conversation = require("../controller/users/chat.controller");

router.get("/get-conversations-list", Conversation.getConversationsList);
router.get("/get-conversation", Conversation.getConversation);

module.exports = router;
