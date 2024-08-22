const { body, validationResult } = require("express-validator");
const {
  getAllClubs,
  getClubById,
  updateUserClubId,
  getMessagesByClubId,
  insertMessage,
} = require("../db/queries");

async function clubsGet(req, res, next) {
  try {
    const clubs = await getAllClubs();
    res.render("clubs", { user: req.user, clubs });
  } catch (err) {
    next(err);
  }
}

async function clubMessagesGet(req, res, next) {
  if (req.user.club_id !== req.params.clubId) {
    return res.redirect(`/clubs/${req.params.clubId}/join`);
  }
  try {
    const messages = await getMessagesByClubId(req.params.clubId);
    res.render("messages", { user: req.user, messages });
  } catch (err) {
    next(err);
  }
}

function newMessageGet(req, res) {
  res.render("message", { user: req.user });
}

const validateNewMessage = [
  body("title")
    .isLength({ min: 1, max: 30 })
    .withMessage("Title length must be between 1 and 30 characters"),
  body("text")
    .isLength({ min: 1, max: 255 })
    .withMessage("Text length must be between 1 and 255 characters"),
];
const newMessagePost = [
  validateNewMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("message", { user: req.user, errors: errors.array() });
    }
    const { title, text } = req.body;
    try {
      await insertMessage(req.user.id, req.params.clubId, title, text);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

async function joinClubAdminGet(req, res, next) {
  if (!req.user || !req.user.is_admin) return next();
  try {
    await updateUserClubId(req.user.id, req.params.clubId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function joinClubGet(req, res, next) {
  try {
    const club = await getClubById(req.params.clubId);
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

module.exports = {
  clubsGet,
  clubMessagesGet,
  newMessageGet,
  newMessagePost,
  joinClubAdminGet,
  joinClubGet,
  joinClubPost,
};
