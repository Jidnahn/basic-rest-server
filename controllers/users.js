const { request, response } = require("express");

const usersGet = (req, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({
    msg: "get API - Controller",
    nombre,
    q,
    apikey,
  });
};

const usersPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API",
    nombre,
    edad,
  });
};

const usersPut = (req = request, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API - Controller",
    id,
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
