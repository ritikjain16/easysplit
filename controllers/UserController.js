import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Hello Users" });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          user.password = hash;
          // console.log(user);
          const addUser = await User.create(user);
          res.status(200).send(addUser);
        });
      });
    } else {
      res.status(400).send({ msg: `User Already exists with ${user.email}` });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, result) => {
        if (result) {
          const payload = {
            userId: findUser._id,
            email,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          // console.log(token);
          res.status(200).send(token);
        } else {
          res.status(400).send({ msg: `Wrong credentials provided` });
        }
      });
    } else {
      res.status(400).send({ msg: `User not exists with ${email}` });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  const { userId } = req.decodeData;
  try {
    const findUser = await User.findOne({ _id: userId });
    if (findUser) {
      findUser.password = "**************";
      res.status(200).send(findUser);
    } else {
      res.status(400).send({ msg: `User not exists` });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/get/all", async (req, res) => {
  try {
    const findUsers = await User.find();
    res.status(200).send(findUsers);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/get/regex", authMiddleware, async (req, res) => {
  const { myRegex } = req.body;
  try {
    const findUsers = await User.find({
      name: { $regex: myRegex, $options: "i" },
    });
    res.status(200).send(findUsers);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete", async (req, res) => {
  const { userId } = req.decodeData;
  try {
    const data = await User.deleteOne({ _id: userId });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
