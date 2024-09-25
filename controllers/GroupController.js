import express from "express";
import Group from "../models/Groups.js";
import Expense from "../models/Expenses.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/Users.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Hello Groups" });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const data = await Group.find().sort({ _id: -1 });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getbyuserId", authMiddleware, async (req, res) => {
  const { userId } = req.decodeData;
  // console.log(userId)
  try {
    const data = await Group.find({ userIds: userId }).sort({
      _id: -1,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  const { userIds } = req.body;
  try {
    const findUsers = await User.find({ _id: { $in: userIds } });
    req.body.users = findUsers;
    let allNames = [];
    findUsers.forEach((u) => {
      allNames.push(u.name);
    });
    req.body.names = allNames;
    const data = await Group.create(req.body);
    res.status(200).send(data);
    // res.status(200).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Group.findOneAndDelete({ _id: req.params.id });
    const data1 = await Expense.deleteMany({ groupId: req.params.id });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
