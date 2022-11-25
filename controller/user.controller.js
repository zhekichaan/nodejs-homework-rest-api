const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Unauthorized, Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword
  // fix later
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
        next(new Conflict("Email in use"));
    }
    console.error(error)
    next(error);
  }
  return res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription
    },
  });
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  user && await bcrypt.compare(password, user.password) ? user.token = jwt.sign({ _id: user._id }, JWT_SECRET) : next(new Unauthorized("Email or password is wrong"));
  await User.findByIdAndUpdate(user._id, user);
  return res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription
    },
  });
}

const logout = async (req, res, next) => {
  const { user } = req;
  user ? user.token = null : next(new Unauthorized("Not authorized"));
  await User.findByIdAndUpdate(user._id, user);
  return res.status(204).json({});
}

const current = async (req, res, next) => {
  const { user } = req;
  user ? res.status(200).json({
    data: {
      email: user.email,
      subscription: user.subscription
    }
  }) : next(new Unauthorized("Not authorized"));
}

const updateSubscription = async (req, res, next) => {
  const { user } = req;
  const { subscription } = req.body;
  user ? user.subscription = subscription : next(new Unauthorized("Not authorized"));
  return res.status(200).json({
    data: {
      email: user.email,
      subscription: user.subscription
    }
  });
}

module.exports = {
    register,
    login,
    logout,
    current,
    updateSubscription
}