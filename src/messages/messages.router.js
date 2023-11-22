// src/messages/messages.router.js
const express = require("express");
const { getPublicMessage, getProtectedMessage, insertNewUser, updateUserName } = require("./messages.service");
const { checkJwt } = require("../authz/check-jwt");

const messagesRouter = express.Router();

messagesRouter.post("/new-user", checkJwt, async (req, res) => {
  const { name, email, password } = req.body;
  const result = await insertNewUser(name, email, password);
  res.status(200).json({ result });
});

messagesRouter.put("/update-user/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const result = await updateUserName(id, newName);
  res.status(200).json({ result });
});

// Agregar rutas y funciones según sea necesario para Vacation-Application, Vacations-Balance, Audit-History

module.exports = {
  messagesRouter,
};
