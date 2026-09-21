import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./server/routes/taskRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TaskFlow Express server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(
        `TaskFlow Express server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();
