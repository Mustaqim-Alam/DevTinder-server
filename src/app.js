const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use("/admin", (req, res, next) => {
  let token = "admin";
  const isAuth = token === "admin";
  if (!isAuth) {
    return res.status(403).send("Access denied for non-admin users");
  }
  next();
});

app.get("/admin", (req, res) => {
  res.send("All Data for Admin");
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
