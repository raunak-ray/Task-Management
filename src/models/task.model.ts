import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdBy: Types.ObjectId;
  assignedTo: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "to-do",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reuired: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
