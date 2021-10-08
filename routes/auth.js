const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
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

module.exports = router;
