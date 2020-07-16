import mongoose from "mongoose";

const TaskModel = new mongoose.Schema(
  {
    dateLimit: String,
    dateEnd: String,
    task_points: Number,
    name: String,
    notification: Boolean,
    done: Boolean,
    _contract: {
      type: mongoose.ObjectId,
      ref: "Contract"
    }
  },
  { timestamps: true },
  {
    collection: "Task"
  }
);

export default mongoose.model("Task", TaskModel);
