require("dotenv").config();
const path = require("node:path");

const express = require("express");
const errorHandler = require("./controllers/errorController");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", authRouter);
// TODO: middleware: isUser, isAdmin

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`),
);
