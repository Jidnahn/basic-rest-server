const validateEntries = require("../middlewares/validate-entries");
const validateJWT = require("../middlewares/validate-jws");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validateEntries,
  ...validateJWT,
  ...validateRoles,
};
