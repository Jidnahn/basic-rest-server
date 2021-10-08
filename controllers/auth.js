const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Incorrect user",
      });
    }
    // Verify if user is active
    if (user.state === false) {
      return res.status(400).json({
        msg: "The account was disabled",
      });
    }
    // Verify password
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }
    // Generate KWT
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please refer to an admin",
    });
  }
};

module.exports = { login };
