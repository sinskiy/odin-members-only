const { Router } = require("express");
const passport = require("passport");
const authRouter = Router();

authRouter.get(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

module.exports = authRouter;
