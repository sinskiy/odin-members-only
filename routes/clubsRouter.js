const { Router } = require("express");
const { clubsGet } = require("../controllers/clubsController");
const clubsRouter = Router();

clubsRouter.get("/clubs", clubsGet);

module.exports = clubsRouter;
