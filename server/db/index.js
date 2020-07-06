import { mongoConnector } from "./mongo_connector";

export default class DBConnector {
  constructor(dbEngine = "mongodb") {
    switch (dbEngine) {
      case "mongodb":
        this.connector = mongoConnector;
        break;
      default:
        this.connector = mongoConnector;
        break;
    }
  }

  connect(){
    this.connector()
  }
}

