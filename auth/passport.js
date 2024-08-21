const pool = require("../db/pool");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { getUserByUsername } = require("../db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        done(null, false, { message: "No user found with this username." });
      }

      const match = bcrypt.compare(password, user.password);
      if (!match) {
        done(null, false, { message: "Password doesn't match" });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);
