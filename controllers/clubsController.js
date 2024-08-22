const { getAllClubs } = require("../db/queries");

async function clubsGet(req, res, next) {
  try {
    const clubs = await getAllClubs();
    res.render("clubs", { user: req.user, clubs });
  } catch (err) {
    next(err);
  }
}

module.exports = { clubsGet };
