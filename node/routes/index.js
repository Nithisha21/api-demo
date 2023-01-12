const express = require("express");
const router = express.Router();
const knex = require("../knex");

router.get("/", async (req, res) => {
  const tasks = await knex("tasks").orderBy("Id", "asc").select("*");
  return res.status(200).json({ data: tasks, message: "Success" });
});

router.post("/", async (req, res) => {
  const { description, title } = req.body;
  const tasks = await knex("tasks").returning("*").insert({
    description,
    title,
  });
  return res.status(200).json({ data: tasks, message: "Success" });
});

router.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  const { description, title } = req.body;
  const tasks = await knex("tasks").where({ Id }).update({
    description,
    title,
  });
  if (!tasks) res.status(500).json({ message: "Something went wrong" });

  return res.status(200).json({ data: tasks, message: "Success" });
});

router.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  const tasks = await knex("tasks").where({ Id }).delete();
  if (!tasks) res.status(500).json({ message: "Something went wrong" });
  return res.status(200).json({ data: tasks, message: "Success" });
});

module.exports = router;
