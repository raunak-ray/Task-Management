import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Task } from "../models/task.model.ts";
import { AppError } from "../lib/AppError.ts";
import { sendResponse } from "../lib/sendResponse.ts";

// Allowed task statuses
const VALID_STATUS = ["todo", "in-progress", "done"];

export const createTaskController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, status, assignedTo } = req.body;

    // Basic validation
    if (!title || !description || !assignedTo) {
      throw new AppError(400, "All fields are required");
    }

    // Validate task status if provided
    if (status && !VALID_STATUS.includes(status)) {
      throw new AppError(400, "Invalid task status");
    }

    // Create task with current user as creator
    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      assignedTo,
      createdBy: req.user?.id,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Task created successfully",
      data: task,
    });
  },
);

export const getTasksController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { status, title } = req.query;

    const filter: any = {};

    // Admin can see all tasks, others only their own
    if (req.user?.role !== "admin") {
      filter.createdBy = req.user?.id;
    }

    // Optional filtering by status
    if (status) {
      filter.status = status;
    }

    // Optional filtering by title
    if (title) {
      filter.title = title;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    sendResponse(res, {
      message: "Tasks fetched successfully",
      data: tasks,
    });
  },
);

export const getTaskByIdController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      throw new AppError(404, "Task not found");
    }

    // Only admin or task creator can access
    if (
      req.user?.role !== "admin" &&
      task.createdBy.toString() !== req.user?.id
    ) {
      throw new AppError(403, "Not allowed to access this task");
    }

    sendResponse(res, {
      message: "Task fetched successfully",
      data: task,
    });
  },
);

export const updateTaskController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new AppError(404, "Task not found");
    }

    // Only admin or task creator can update
    if (
      req.user?.role !== "admin" &&
      task.createdBy.toString() !== req.user?.id
    ) {
      throw new AppError(403, "Not allowed to update this task");
    }

    // Validate status update
    if (status && !VALID_STATUS.includes(status)) {
      throw new AppError(400, "Invalid task status");
    }

    // Update fields if provided
    if (title) task.title = title.trim();
    if (description !== undefined) task.description = description;
    if (status) task.status = status;

    await task.save();

    sendResponse(res, {
      message: "Task updated successfully",
      data: task,
    });
  },
);

export const deleteTaskController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new AppError(404, "Task not found");
    }

    // Only admin or task creator can delete
    if (
      req.user?.role !== "admin" &&
      task.createdBy.toString() !== req.user?.id
    ) {
      throw new AppError(403, "Not allowed to delete this task");
    }

    await task.deleteOne();

    sendResponse(res, {
      message: "Task deleted successfully",
    });
  },
);
