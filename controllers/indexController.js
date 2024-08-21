function indexGet(req, res) {
  res.render("index", { title: "Home" });
}

module.exports = { indexGet };
