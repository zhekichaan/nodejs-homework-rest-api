const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [tokenType, token] = authHeader.split(" ");
    if (tokenType === "Bearer" && token) {
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(verifiedToken._id);
      user && user.token ? req.user = user : next(new Unauthorized("Not authorized"));
      return next(); 
    }
  return next(new Unauthorized("No token"));
  } catch (error) {
    next(new Unauthorized("Not authorized"))
  }
}

module.exports = {
  auth
};
