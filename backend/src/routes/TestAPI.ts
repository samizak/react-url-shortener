import express from "express";
import mongoose from "mongoose";
import config from "../config/config";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json("API is working fine!");
});

router.get("/database", async (req, res) => {
  if (config.mongooseURI === "") {
    res.status(500).json("mongooseURI cannot be empty!");
    process.exit(1);
  }

  try {
    await mongoose
      .connect(config.mongooseURI, {
        useNewUrlParser: true,
      } as mongoose.ConnectOptions)
      .then(() => res.json("Database connected!"));
  } catch (e) {
    res.status(500).json("Failed to connect to MongoDB database!");
  }
});

export default router;
