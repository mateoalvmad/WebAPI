// src/messages/messages.service.js
const getPublicMessage = () => {
  return {
    message: "The API doesn't require an access token to share this message.",
  };
};

const getProtectedMessage = () => {
  return {
    message: "The API successfully validated your access token.",
  };
};

const insertNewUser = async (name, email, password) => {
  const [rows] = await req.db.query(
    "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return rows;
};

const updateUserName = async (id, newName) => {
  const [rows] = await req.db.query(
    "UPDATE User SET name = ? WHERE ID = ?",
    [newName, id]
  );
  return rows;
};

// Agregar funciones para Vacation-Application, Vacations-Balance, Audit-History según sea necesario

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  insertNewUser,
  updateUserName,
  // Agregar funciones exportadas según sea necesario
};
