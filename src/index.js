// src/index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mysql = require("mysql2/promise");
const { clientOrigins, serverPort, dbConfig } = require("./config/env.dev");

const { messagesRouter } = require("./messages/messages.router");

const app = express();
const apiRouter = express.Router();

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

const pool = mysql.createPool(dbConfig);

app.use(async (req, res, next) => {
  req.db = await pool.getConnection();
  req.db.begin();
  res.on("finish", () => req.db.commit());
  res.on("close", () => req.db.rollback());
  next();
});

app.use("/api", apiRouter);

apiRouter.use("/messages", messagesRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
