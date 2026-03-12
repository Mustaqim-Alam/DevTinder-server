const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");
const User = require("./Model/user");
const validator = require("validator");
const user = require("./routes/user.route");
dotenv.config();
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());

app.use("/user", user.router);

connectDB()
  .then(() => {
    console.log("Database connected successfully....");
    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
