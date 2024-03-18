import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
  paidBy: String,
  totalAmount: Number,
  title: String,
  paidFor: Array,
  groupId: String,
});

const Expense = mongoose.model("expense", ExpenseSchema);

export default Expense;
