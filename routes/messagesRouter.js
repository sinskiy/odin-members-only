const { Router } = require("express");
const { messageDeletePost } = require("../controllers/messagesController");
const { isAdmin } = require("../controllers/authController");
const messagesRouter = Router();

messagesRouter.post("/:messageId/delete", isAdmin, messageDeletePost);

module.exports = messagesRouter;
