import express from "express";
import "dotenv/config";
import { connectToDb } from "./config/db.ts";
import authRoutes from "./routes/auth.route.ts";
import taskRoutes from "./routes/task.route.ts";
import { loggerMiddleware } from "./middleware/logger.middleware.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(loggerMiddleware);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Management API is running",
    healthCheck: "/health",
    authRoutes: "/auth",
    taskRoutes: "/tasks"
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

app.use(errorMiddleware);

async function startServer() {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
  });
}

startServer();