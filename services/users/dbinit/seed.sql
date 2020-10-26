CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL
);

CREATE TABLE ownerships (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL REFERENCES users (id),
  car_id int NOT NULL
);

INSERT INTO users (username) VALUES
 ('John Smith'), ('Jane Doe');

INSERT INTO ownerships (user_id, car_id) VALUES
  (1, 1), (1, 2), (2, 2);