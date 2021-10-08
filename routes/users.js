const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/users");
const {
  isRoleValid,
  emailExists,
  userExistsById,
} = require("../helpers/db-validators");
const {
  validateEntries,
  validateJWT,
  isAdminRole,
  hasRole,
} = require("../middlewares");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("name", "Name is mandatory").not().isEmpty(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
    // check("role", "Role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    check("email").custom(emailExists),
    validateEntries,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(userExistsById),
    check("role").custom(isRoleValid),
    validateEntries,
  ],
  usersPut
);

router.patch("/", usersPatch);

router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE"),
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(userExistsById),
    validateEntries,
  ],
  usersDelete
);

module.exports = router;
