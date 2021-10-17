const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
    // Generate JWT
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    // if user doesn't exist create it
    if (!user) {
      const data = {
        role: "USER_ROLE",
        name,
        email,
        password: ":P",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //if user exists in DB
    if (!user.state) {
      return res.status(401).json({
        msg: "Talk with an admin - User blocked",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "All OK",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token could not be verified",
    });
  }
};

module.exports = { login, googleSignIn };
