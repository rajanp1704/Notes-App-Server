const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleResponse = require("../helpers/handleResponse");

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return handleResponse.forbiddenError(
      res,
      "Access Denied! No token provided."
    );
  }

  const token = authHeader.replace(`Bearer `, "");

  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedJWT.id);

  if (!user) {
    return handleResponse.forbiddenError(res, "Access Denied! No user found.");
  }

  req.user = user;
  next();
};

module.exports = isLoggedIn;
