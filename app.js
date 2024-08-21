require("dotenv").config();
const path = require("node:path");

const express = require("express");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index", { title: "Home" }));

app.listen(process.env.PORT, () =>
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`),
);
