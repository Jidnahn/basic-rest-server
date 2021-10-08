const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying to verify role without token",
    });
  }

  if (req.user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "User does not have permissions",
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to verify role without token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `User does not have permissions - Need one of ${roles}`,
      });
    }
    next();
  };
};

module.exports = { isAdminRole, hasRole };
