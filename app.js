require("dotenv").config();
const path = require("node:path");

const errorHandler = require("./controllers/errorController");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");

const session = require("express-session");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);

const express = require("express");
const passport = require("passport");
const clubsRouter = require("./routes/clubsRouter");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const DAY = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({ pool }),
    cookie: {
      maxAge: DAY * 2,
    },
  }),
);
require("./auth/passport");
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user);
  next();
});
app.use("/", indexRouter);
app.use("/", clubsRouter);
app.use("/", authRouter);
// TODO: middleware: isUser, isAdmin

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`),
);
