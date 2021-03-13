DROP TABLE IF EXISTS helo_users;

CREATE TABLE helo_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic text
)

CREATE TABLE helo_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content text,
    img text,
    author_id INTEGER REFERENCES helo_users(id),
    date_created TIMESTAMP
)

