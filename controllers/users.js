const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const resp = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    resp,
  });
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt pw
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req = request, res) => {
  const id = req.params.id;
  const { _id, password, google, ...rest } = req.body;

  // TODO valiate against DB
  if (password) {
    // Encrypt pw
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    userDB,
  });
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  // Physically delete
  // const user = await User.findByIdAndDelete(id);
  const authenticatedUser = req.user;

  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    user,
    // authenticatedUser,
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
