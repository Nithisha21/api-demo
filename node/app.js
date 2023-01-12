const express = require("express");
const app = express();
// const { Pool } = require("pg");
const knex = require("./knex");
const cors = require("cors");

const TasksRouter = require("./routes");

const port = 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/tasks", TasksRouter);

app.get("/tasks-direct", async (req, res) => {
  const tasks = await knex("tasks").select("*");
  return res.status(200).json({ data: tasks, message: "Success" });
});

app.listen(port, () => console.log(`server started on ${port}`));
