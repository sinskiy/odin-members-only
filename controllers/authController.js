const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { getUserByUsername, insertUser } = require("../db/queries");

function loginGet(req, res) {
  res.render("login");
}

function logoutPost(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function signupGet(req, res) {
  res.render("signup");
}

const validateUser = [
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain only numbers and letters.")
    .isLength({ min: 1, max: 30 })
    .withMessage("Username must be between 1 and 30 characters.")
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) {
        throw new Error("Username must be unique.");
      }
    }),
  body("firstName")
    .isAlpha()
    .withMessage("First name must contain only letters.")
    .isLength({ min: 1, max: 30 })
    .withMessage("First name must be between 1 and 30 characters."),
  body("lastName")
    .isAlpha()
    .withMessage("Last name must contain only letters.")
    .isLength({ min: 1, max: 30 })
    .withMessage("Last name must be between 1 and 30 characters."),
  body("password")
    .isLength({ min: 1, max: 255 })
    .withMessage("Password name must be between 1 and 255 characters."),
  body("confirm-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
  body("isAdmin")
    .optional()
    .matches("on")
    .withMessage("Is admin must be a boolean"),
];

const signupPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    const { username, firstName, lastName, password, isAdmin } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      }
      try {
        await insertUser({
          username,
          firstName,
          lastName,
          password: hashedPassword,
          isAdmin,
        });
        res.redirect("/");
      } catch (err) {
        next(err);
      }
    });
  },
];

module.exports = { loginGet, logoutPost, signupGet, signupPost };
