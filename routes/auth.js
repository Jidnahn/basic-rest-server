const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validateEntries } = require("../middlewares/validate-entries");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    validateEntries,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "Google token is mandatory").not().isEmpty(),
    validateEntries,
  ],
  googleSignIn
);

module.exports = router;
