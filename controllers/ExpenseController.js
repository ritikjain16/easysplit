import express from "express";
import Expense from "../models/Expenses.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Hello Expenses" });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const data = await Expense.find({ groupId: req.params.id }).sort({_id:-1});
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = await Expense.create(req.body);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Expense.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
