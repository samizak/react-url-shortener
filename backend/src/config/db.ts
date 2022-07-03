import mongoose from "mongoose";
import config from "./config";

async function ConnectDB() {
  if (config.mongooseURI === "") {
    console.error("mongooseURI cannot be empty!");
    process.exit(1);
  }

  try {
    await mongoose
      .connect(config.mongooseURI, {
        useNewUrlParser: true,
      } as mongoose.ConnectOptions)
      .then(() => console.log("Database connected!"));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

export default ConnectDB;
