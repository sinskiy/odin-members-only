const { Router } = require("express");
const passport = require("passport");
const { signupGet, signupPost } = require("../controllers/authController");
const authRouter = Router();

authRouter.get(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);
authRouter.get("/signup", signupGet);
authRouter.post("/signup", signupPost);

module.exports = authRouter;
