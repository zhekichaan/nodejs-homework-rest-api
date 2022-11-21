const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
    const { email, password } = req.body;
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password });
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
        return res.status(409).json({
            message: "Email in use"
        });
    }
    console.error(error)
    next(error);
  }
  return res.status(201).json({
    data: {
      user: {
        _id: user._id,
      },
    },
  });
}

const login = async (req, res, next) => {
    // const authHeader = req.headers.authorization || "";

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.json({
            message: "User not found"
        });
    }
    console.log(password);
    console.log(user.password);
    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    console.log(isPasswordTheSame);
    if (!isPasswordTheSame) {
        return res.json({
            message: "Wrong password"
        });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    
    user.token = token;
    await User.findByIdAndUpdate(user._id, user);

    return res.json({
        data: {
          token,
        },
      });
}


module.exports = {
    register,
    login
}