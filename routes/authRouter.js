const { Router } = require("express");
const passport = require("passport");
const {
  signupGet,
  signupPost,
  loginGet,
  logoutPost,
} = require("../controllers/authController");
const authRouter = Router();

authRouter.get("/login", loginGet);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);
authRouter.post("/logout", logoutPost);

authRouter.get("/signup", signupGet);
authRouter.post("/signup", signupPost);

module.exports = authRouter;
