import express from "express";
import "dotenv/config";
import { connectToDb } from "./config/db";
import authRoutes from "./routes/auth.route.ts";
import { loggerMiddleware } from "./middleware/logger.middleware.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(loggerMiddleware);

app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
  connectToDb();
});
