const { body, validationResult } = require("express-validator");
const { getAllClubs, getClubById, updateUserClubId } = require("../db/queries");

async function clubsGet(req, res, next) {
  try {
    const clubs = await getAllClubs();
    res.render("clubs", { user: req.user, clubs });
  } catch (err) {
    next(err);
  }
}

async function joinClubGet(req, res, next) {
  try {
    const club = await getClubById(req.params.clubId);
    // TODO: check if non-user or already in club
    res.render("join", { user: req.user, club });
  } catch (err) {
    next(err);
  }
}

const validatePasscode = [
  body("passcode").custom(async (value, { req }) => {
    const club = await getClubById(req.params.clubId);
    if (value !== club.passcode) {
      throw new Error("Passcode must match.");
    }
  }),
];
const joinClubPost = [
  validatePasscode,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const club = await getClubById(req.params.clubId);
      return res
        .status(400)
        .render("join", { user: req.user, club, errors: errors.array() });
    }
    try {
      await updateUserClubId(req.user.id, req.params.clubId);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

module.exports = { clubsGet, joinClubGet, joinClubPost };
