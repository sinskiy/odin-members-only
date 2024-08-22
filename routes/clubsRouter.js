const { Router } = require("express");
const {
  clubsGet,
  joinClubGet,
  joinClubPost,
  clubMessagesGet,
  newMessageGet,
  newMessagePost,
  joinClubAdminGet,
} = require("../controllers/clubsController");
const { isUser } = require("../controllers/authController");
const clubsRouter = Router();

clubsRouter.get("/", clubsGet);
clubsRouter.get("/:clubId", isUser, clubMessagesGet);
clubsRouter.get("/:clubId/message", newMessageGet);
clubsRouter.post("/:clubId/message", newMessagePost);
clubsRouter.get("/:clubId/join", isUser, joinClubAdminGet, joinClubGet);
clubsRouter.post("/:clubId/join", joinClubPost);

module.exports = clubsRouter;
