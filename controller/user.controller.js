const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Unauthorized, Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar')
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { nanoid } = require("nanoid");
const sendGrid = require("@sendgrid/mail");

const { JWT_SECRET, SEND_GRID_API_KEY } = process.env;
sendGrid.setApiKey(SEND_GRID_API_KEY);

const msg = (email, token) => {
  return {
    to: email,
    from: 'eugene.chernitskiy@gmail.com',
    subject: 'Verify your email',
    text: `Please open this link: localhost:3000/api/users/verify/${token} to verify your email`,
    html: `<h1> Please open this link: localhost:3000/api/users/verify/${token} to verify your email <h1>`,
  }
}

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const user = new User({ email, password, avatarURL, verificationToken });
  await sendGrid.send(msg(email, verificationToken));
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
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
  if(user.verify === false) {
    res.status(404).json({ message: "Email is not verified" })
  }
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
  user.token = null
  await User.findByIdAndUpdate(user._id, user);
  return res.status(204).json({});
}

const current = async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    data: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const updateSubscription = async (req, res, next) => {
  const { user } = req;
  const { subscription } = req.body;
  user.subscription = subscription
  return res.status(200).json({
    data: {
      email: user.email,
      subscription: user.subscription
    }
  });
}

const updateAvatar = async (req, res, next) => {
  const { user, file } = req
  file.filename = user._id + ".jpeg"
  const image = await jimp.read(file.path);
  image.resize(250, 250);
  await image.writeAsync(file.path);
  const newPath = path.join(__dirname, "../public/avatars", file.filename);
  await fs.rename(file.path, newPath);
  user.avatarURL = "/avatars/" + file.filename
  await User.findByIdAndUpdate(user._id, user);
  return res.json({
    avatarURL: "/avatars/" + file.filename
   })
}

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOneAndUpdate({ verificationToken }, {
    verificationToken: null,
    verify: true
  }, {new: true})
  user ? res.status(200).json({message: "Verification successful"}) : res.status(404).json({message: "Not Found"});
}

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email });
  if(user.verify === true) {
    return res.status(400).json({ message: "Verification has already been passed"});
  }
    await sendGrid.send(msg(email, user.verificationToken));
    return res.status(200).json({ message: "Verification email sent"});
}

module.exports = {
    register,
    login,
    logout,
    current,
    updateSubscription,
    updateAvatar,
    verify,
    resendVerifyEmail
}