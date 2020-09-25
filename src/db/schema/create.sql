DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS guest_details CASCADE;
DROP TABLE IF EXISTS guest_items CASCADE;
DROP TABLE IF EXISTS event_messages CASCADE;
DROP TABLE IF EXISTS event_comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(60) NOT NULL,
  avatar_url TEXT
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL,
  address TEXT NOT NULL,
  post_code VARCHAR(60) NOT NULL,
  city VARCHAR(60) NOT NULL,
  province VARCHAR(60) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  recipe_id INTEGER NOT NULL 
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL 
);

CREATE TABLE guest_details (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE guest_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  guest_id INTEGER REFERENCES guest_details(user_id) ON DELETE CASCADE
);

CREATE TABLE event_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE event_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT NOW()
);


