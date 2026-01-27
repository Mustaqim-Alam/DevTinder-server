const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use('/', (req,res)=>{
    res.send("DevTinder Backend is running....")
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
