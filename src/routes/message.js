const express = require("express");
const messagesRouter = express.Router();
const {
  getMessagesBySenderAndRecipient,
  deleteMessageById,
  editMessageById,
} = require("../controller/messages/index");

messagesRouter.get("/messages", getMessagesBySenderAndRecipient);
messagesRouter.delete("/message/delete/:id", deleteMessageById);
messagesRouter.put("/message/edit/:id", editMessageById);

module.exports = messagesRouter;
