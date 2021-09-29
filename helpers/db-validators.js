const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} does not exist in the DB`);
  }
};

const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email already in use");
  }
};

const userExistsById = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error("User does not exist");
  }
};

module.exports = {
  isRoleValid,
  emailExists,
  userExistsById,
};
