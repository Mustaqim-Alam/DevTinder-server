// src/Config/database.js
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    if (!MONGO_DB) {
      throw new Error("MongoDB connection string is undefined");
    }

    console.log("Connecting to MongoDB...");

    // NO OPTIONS AT ALL - just the connection string
    const conn = await mongoose.connect(MONGO_DB);

    console.log("MongoDB Connected Successfully!");
    console.log(`Database: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Handle application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDB;
