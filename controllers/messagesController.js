const { deleteMessageById } = require("../db/queries");

async function messageDeletePost(req, res, next) {
  try {
    await deleteMessageById(req.params.messageId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}
module.exports = { messageDeletePost };
