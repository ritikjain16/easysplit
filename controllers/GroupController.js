import express from "express";
import Group from "../models/Groups.js";
import Expense from "../models/Expenses.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Hello Groups" });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await Group.find().sort({_id:-1});
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = await Group.create(req.body);
    res.status(200).send(data);
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
