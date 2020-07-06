import mongoose from "mongoose";
import { AppConfig } from "../config";

mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);

export const mongoConnector = async () => {
  mongoose.set("debug", true);
  const mongoUri = AppConfig.databaseUri;
  try {
    const connection = await mongoose.connect(mongoUri, { useNewUrlParser: true });
    console.log("Connection succesful!");
    return connection.connection.db
  } catch (err) {
    console.log("error: " + err);
  }
};
