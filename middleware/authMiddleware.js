import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    try {
      const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.decodeData = decodeData;
      next();
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send("No token provided");
  }
};

export default authMiddleware;
