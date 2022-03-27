CREATE DATABASE tradingstocks;

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE public.holdings
(
    holding_id serial,
    user_id integer,
    name character varying,
    symbol character varying,
    shares integer,
    price decimal,
    percent_change character varying,
    PRIMARY KEY (holding_id)
);

