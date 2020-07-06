
import dotenv from 'dotenv'

const Config = dotenv.config()

if (Config.error) {
  throw Config.error
}

export const AppConfig = {
  databaseEngine: Config.parsed.DATABASE_ENGINE || "mongodb",
  databaseUri: Config.parsed.DATABASE_URI,
}


