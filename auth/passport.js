const pool = require("../db/pool");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { getUserByUsername, getUserById } = require("../db/queries");

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
