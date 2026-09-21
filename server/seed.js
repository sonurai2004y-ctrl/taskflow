import "dotenv/config";
import mongoose from "mongoose";
import Task from "./models/Task.js";

const seedTasks = [
  {
    title: "Learn MongoDB",
    description: "Understand databases and collections.",
    completed: false,
  },
  {
    title: "Learn Mongoose",
    description: "Create schemas and models for TaskFlow.",
    completed: true,
  },
];

try {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB");

  await Task.deleteMany({});

  const createdTasks = await Task.insertMany(seedTasks);

  console.log(`Inserted ${createdTasks.length} tasks`);

  await mongoose.disconnect();

  console.log("Disconnected from MongoDB");
} catch (error) {
  console.error("Database seeding failed:", error);
  process.exit(1);
}
