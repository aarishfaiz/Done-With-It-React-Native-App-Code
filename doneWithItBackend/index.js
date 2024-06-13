const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

const { connect } = require("./config");
const router = require("./Routes/routes.js");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("React Native Backend");
});

app.use("/api", router);
connect();

app.use((req, res, next) => {
  req.header("Access-Control-Allow-origin", "*");
  res.header("Access-Control-Allow-origin", "*");
  next();
});

app.listen(port, () => {
  console.log("Server is Running" + ` ${port}`);
});
