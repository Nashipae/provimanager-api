import mongoose from "mongoose";

const TaskModel = new mongoose.Schema(
  {
    dateLimit: Date,
    dateEnd: Date,
    task_points: Number,
    name: String,
    notification: Boolean,
    done: Boolean
  },
  { timestamps: true },
  {
    collection: "Task"
  }
);

export default mongoose.model("Task", TaskModel);
