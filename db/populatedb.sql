CREATE TABLE IF NOT EXISTS clubs (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  club_id INT,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY(club_id)
    REFERENCES clubs(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  club_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(30),
  text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY(club_id)
    REFERENCES clubs(id)
    ON DELETE CASCADE,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE VIEW messages_joined AS
  SELECT clubs.name AS club, users.username, messages.title, messages.text, messages.created_at
  FROM messages
  JOIN users ON messages.user_id = users.id
  JOIN clubs ON messages.club_id = clubs.id;