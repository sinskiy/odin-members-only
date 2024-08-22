const { Router } = require("express");
const {
  clubsGet,
  joinClubGet,
  joinClubPost,
  clubMessagesGet,
  newMessageGet,
  newMessagePost,
} = require("../controllers/clubsController");
const clubsRouter = Router();

clubsRouter.get("/clubs", clubsGet);
clubsRouter.get("/clubs/:clubId", clubMessagesGet);
clubsRouter.get("/clubs/:clubId/message", newMessageGet);
clubsRouter.post("/clubs/:clubId/message", newMessagePost);
clubsRouter.get("/clubs/:clubId/join", joinClubGet);
clubsRouter.post("/clubs/:clubId/join", joinClubPost);

module.exports = clubsRouter;
