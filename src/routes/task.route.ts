import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { createTaskController, deleteTaskController, getTaskByIdController, getTasksController, updateTaskController } from "../controllers/task.controller.ts";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasksController)
router.get("/:id", getTaskByIdController)
router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;