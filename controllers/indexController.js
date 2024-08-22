const { getAllMessages } = require("../db/queries");

async function indexGet(req, res, next) {
  try {
    const messages = await getAllMessages();
    console.log(messages);
    res.render("index", { user: req.user, messages });
  } catch (err) {
    next(err);
  }
}

module.exports = { indexGet };
