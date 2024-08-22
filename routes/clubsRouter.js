const { Router } = require("express");
const {
  clubsGet,
  joinClubGet,
  joinClubPost,
} = require("../controllers/clubsController");
const clubsRouter = Router();

clubsRouter.get("/clubs", clubsGet);
clubsRouter.get("/clubs/:clubId/join", joinClubGet);
clubsRouter.post("/clubs/:clubId/join", joinClubPost);

module.exports = clubsRouter;
