import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    role: String,
    name: String,
    last_name: String,
    id_doc: String,
    username: String,
    password: String,
    _providers: [
      {
        type: mongoose.ObjectId,
        ref: "Provider"
      }
    ],
  },
  { timestamps: true },
  {
    collection: "User"
  }
);

export default mongoose.model("User", UserModel);
