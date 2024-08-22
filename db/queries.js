const pool = require("./pool");

async function getAllClubs() {
  const { rows } = await pool.query("SELECT * FROM clubs");
  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];
  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];
  return user;
}

async function insertUser({ username, firstName, lastName, password }) {
  await pool.query(
    "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
    [username, firstName, lastName, password],
  );
}

module.exports = { getAllClubs, getUserByUsername, getUserById, insertUser };
