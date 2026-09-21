import express from "express";

const router = express.Router();

const tasks = [
  {
    id: 1,
    title: "Learn Express.js",
    completed: false,
  },
  {
    id: 2,
    title: "Understand Express Routing",
    completed: true,
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
});

export default router;
