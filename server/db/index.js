import { mongoConnector } from "./mongo_connector";

const DBConnector = {
  connect: (dbEngine = "mongodb") => {
    switch (dbEngine) {
      case "mongodb":
        mongoConnector;
        break;
      default:
        mongoConnector;
        break;
    }
  }
};
export default DBConnector;
