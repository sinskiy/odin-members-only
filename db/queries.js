const pool = require("./pool");

async function getAllClubs() {
  const { rows } = await pool.query("SELECT * FROM clubs");
  return rows;
}

async function getClubById(id) {
  const { rows } = await pool.query("SELECT * FROM clubs WHERE id = $1", [id]);
  const club = rows[0];
  return club;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users_clubs WHERE username = $1",
    [username],
  );
  const user = rows[0];
  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users_clubs WHERE id = $1", [
    id,
  ]);
  const user = rows[0];
  return user;
}

async function insertUser(username, firstName, lastName, password, isAdmin) {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password, is_admin) VALUES ($1, $2, $3, $4, $5)",
    [username, firstName, lastName, password, isAdmin],
  );
}

async function updateUserClubId(userId, clubId) {
  await pool.query("UPDATE users SET club_id = $1 WHERE id = $2", [
    clubId,
    userId,
  ]);
}

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages_joined ORDER BY created_at DESC",
  );
  return rows;
}

async function getMessagesByClubId(id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages_joined WHERE club_id = $1 ORDER BY created_at DESC",
    [id],
  );
  return rows;
}

async function insertMessage(userId, clubId, title, text) {
  await pool.query(
    "INSERT INTO messages (user_id, club_id, title, text) VALUES ($1, $2, $3, $4)",
    [userId, clubId, title, text],
  );
}

module.exports = {
  getAllClubs,
  getClubById,
  getUserByUsername,
  getUserById,
  insertUser,
  updateUserClubId,
  getAllMessages,
  getMessagesByClubId,
  insertMessage,
};
