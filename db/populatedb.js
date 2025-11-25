#! /usr/bin/env node

import "dotenv/config";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS brand (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  description VARCHAR(255),
  image VARCHAR(255),
  price DECIMAL(8,2),
  category_id INTEGER REFERENCES category(id),
  brand_id INTEGER REFERENCES brand(id)
);

CREATE TABLE IF NOT EXISTS store (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS stock_levels (
  store_id INTEGER REFERENCES store(id),
  product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
  quantity INTEGER
);

INSERT INTO category (name) VALUES ('Racquets');
INSERT INTO category (name) VALUES ('Tennis Balls');
INSERT INTO category (name) VALUES ('Strings');
INSERT INTO category (name) VALUES ('Shoes');

INSERT INTO brand (name) VALUES ('Wilson');
INSERT INTO brand (name) VALUES ('Yonex');
INSERT INTO brand (name) VALUES ('Luxilon');
INSERT INTO brand (name) VALUES ('ASICS');

INSERT INTO product (
  name,
  description,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Yonex VCORE PRO 97 Racquet',
  'The Yonex VCORE PRO 97 310 is a control-oriented tennis racquet favored by intermediate to advanced players who can generate their own power.',
  NULL,
  349.95,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Yonex' LIMIT 1)
);
INSERT INTO product (
  name,
  description,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson Tour Premier All Court Tennis 4-Ball Can',
  'USTA/ITF/Tennis Australia approved. Yellow Optivis felt for increased visibility and maximum unique woven felt fibers for ultimate consistency and playability.',
  NULL,
  13.95,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO product (
  name,
  description,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Luxilon Big Banger ALU Power Rough',
  'The ALU Power Rough 125 is a rougher version of ALU Power 125 for increased spin potential. The dented surface also provides more string flex for a slightly softer and more forgiving feel.',
  NULL,
  34.95,
  (SELECT id from category WHERE name = 'Strings' LIMIT 1),
  (SELECT id from brand WHERE name = 'Luxilon' LIMIT 1)
);
INSERT INTO product (
  name,
  description,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'ASICS Gel-Resolution X',
  'This stability-focused, top-quality men’s tennis shoe from ASICS in white is equipped with a hard court outsole, making it highly suitable for use on hard court surfaces.',
  NULL,
  230.00,
  (SELECT id from category WHERE name = 'Shoes' LIMIT 1),
  (SELECT id from brand WHERE name = 'ASICS' LIMIT 1)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
