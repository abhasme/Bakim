const jwt = require("jsonwebtoken");
const { unauthorizedResponse } = require('../helpers/Response');
const { JWT_SECRET, JWT_TOKEN_EXPIRESDAYS } = require('../config/constants')
const translate = require('../locales/translate')

const customerAuthCheck = async (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return unauthorizedResponse(res, "Authorization Token not found"); // if there isn't any token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return unauthorizedResponse(res, "User not authorized to access.");
    }
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

const salonAuthCheck = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return unauthorizedResponse(res, translate[req.headers["x-language-key"]].USER_UNAUTHORIZED_TO_ACCESS); // if there isn't any token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (user && user.userType === 'Salon'||user.userType === 'Employee') {
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    }
    else {
      return unauthorizedResponse(res, translate[req.headers["x-language-key"]].USER_UNAUTHORIZED_TO_ACCESS);
    }
  });
};

const adminAuthCheck = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return unauthorizedResponse(res, translate[req.headers["x-language-key"]].USER_UNAUTHORIZED_TO_ACCESS); // if there isn't any token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (user && user.userType === 'Admin') {
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    }
    else {
      return unauthorizedResponse(res, translate[req.headers["x-language-key"]].USER_UNAUTHORIZED_TO_ACCESS);
    }
  });
};

module.exports = {
  customerAuthCheck,
  salonAuthCheck,
  adminAuthCheck,
};