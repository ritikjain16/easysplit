import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "./connection/mongoConn.js";
// import EmployeeRoute from "./controllers/EmpController.js";
import GroupRoute from "./controllers/GroupController.js";
import ExpenseRoute from "./controllers/ExpenseController.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// app.use("/emp", EmployeeRoute);

app.use("/group", GroupRoute);
app.use("/expense", ExpenseRoute);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to Node Js App" });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
