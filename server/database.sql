CREATE DATABASE jwttraining;

create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Insert sample user

INSERT INTO users (user_name, user_email, user_password)
VALUES ('john', 'johndoe@gmail.com', '123456');
