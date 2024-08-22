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

clubsRouter.get("/clubs", clubsGet);
clubsRouter.get("/clubs/:clubId", isUser, clubMessagesGet);
clubsRouter.get("/clubs/:clubId/message", newMessageGet);
clubsRouter.post("/clubs/:clubId/message", newMessagePost);
clubsRouter.get("/clubs/:clubId/join", isUser, joinClubAdminGet, joinClubGet);
clubsRouter.post("/clubs/:clubId/join", joinClubPost);

module.exports = clubsRouter;
