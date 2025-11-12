import jwt from "jsonwebtoken";
import config from "../config/index.js";

const createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
