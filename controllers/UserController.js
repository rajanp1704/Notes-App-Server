const User = require("../models/User");
const handleResponse = require("../helpers/handleResponse");
const isLoggedIn = require("../middlewares/isLoggedIn");
const UserValidations = require("../validations/UserValidations");
const jwt = require("jsonwebtoken");

exports.Register = [
  UserValidations.Register,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existedUser = await User.findOne({ email });

      if (!!existedUser) {
        return handleResponse.errorMessage(
          res,
          "User Already Exists! Try Login."
        );
      }
      const user = new User({ name, email, password });
      await user.save();
      return handleResponse.successMessage(res, "User Created Successfully!");
    } catch (err) {
      return handleResponse.errorMessage(res, err?.message);
    }
  },
];

exports.Login = [
  UserValidations.Login,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return handleResponse.errorMessage(res, "No User Found!");
      }
      if (user && user?.password !== password) {
        return handleResponse.errorMessage(res, "Incorrect Password!");
      }

      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      return handleResponse.successMessageWithData(
        res,
        "Logged In Successfully!",
        {
          token,
        }
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];

exports.GetLoggedInUser = [
  isLoggedIn,
  async (req, res) => {
    try {
      return handleResponse.successMessageWithData(
        res,
        "User Found Successfully!",
        req.user
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];

exports.Update = [
  isLoggedIn,
  UserValidations.Update,
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req?.user?._id,
        {
          name: req?.body?.name || req?.user?.name,
          email: req?.body?.email || req?.user?.email,
          password: req?.body?.password || req?.user?.password,
        },
        { new: true }
      );

      return handleResponse.successMessageWithData(
        res,
        "User Updated Successfully!",
        updatedUser
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];

exports.Delete = [
  isLoggedIn,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);

      return handleResponse.successMessage(res, "User Deleted Successfully!");
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];
