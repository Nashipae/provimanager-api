import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    role: String,
    name: String,
    last_name: String,
    id_doc: String,
    username: String,
    password: String
  },
  { timestamps: true },
  {
    collection: "User"
  }
);

export default mongoose.model("User", UserModel);
