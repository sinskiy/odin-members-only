CREATE TABLE IF NOT EXISTS clubs (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL,
  passcode VARCHAR(255) NOT NULL
);

INSERT INTO clubs (name, passcode) VALUES
  ('red', 'The red carpet can hide more than just blood stains.'),
  ('green', 'Green is the prime color of the world and that from which its loveliness arises.'),
  ('blue', 'Blue that will always be there as it is now after all man’s destruction is finished.');

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  club_id INT,
  is_admin BOOLEAN NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY(club_id)
    REFERENCES clubs(id)
    ON DELETE SET NULL
);

CREATE VIEW users_clubs AS
  SELECT clubs.name AS club, username, club_id, users.id AS id, is_admin, password
  FROM users
  FULL JOIN clubs ON users.club_id = clubs.id;

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
  SELECT clubs.name AS club, users.username, messages.club_id AS club_id, messages.title, messages.text, messages.created_at
  FROM messages
  JOIN users ON messages.user_id = users.id
  JOIN clubs ON messages.club_id = clubs.id;