import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";

const router = express.Router();

// GET /api/tasks
// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// GET /api/tasks/:id
// Get one task
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error("Failed to fetch task:", error);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
});

// POST /api/tasks
// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Failed to create task:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// PUT /api/tasks/:id
// Update a task
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const { title, description, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error("Failed to update task:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE /api/tasks/:id
// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    console.error("Failed to delete task:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;
