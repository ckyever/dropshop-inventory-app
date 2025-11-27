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
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Yonex VCORE 95',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=YVC95-1.jpg&nw=540',
  349.95,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Yonex' LIMIT 1)
);
INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson US Open Regular Duty Single Can',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=USORDS-1.jpg&nw=540',
  13.95,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Luxilon Big Banger Original 16/1.30 String',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=BB16-NA-1.jpg&nw=540',
  34.95,
  (SELECT id from category WHERE name = 'Strings' LIMIT 1),
  (SELECT id from brand WHERE name = 'Luxilon' LIMIT 1)
);
INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Asics Gel Resolution X White/Black Men''s Shoes',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=AGRXWHB-1.jpg&nw=540',
  230.00,
  (SELECT id from category WHERE name = 'Shoes' LIMIT 1),
  (SELECT id from brand WHERE name = 'ASICS' LIMIT 1)
);
INSERT INTO store (name, address)
VALUES ('Melbourne Store', '123 Flinders St, Melbourne, Australia');
INSERT INTO store (name, address)
VALUES ('Wimbledon Store', 'The All England Lawn Tennis Club, Wimbledon, England');

INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Yonex VCORE 95'),
  5
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson Tour Premier All Court Tennis 4-Ball Can'),
  100
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson Tour Premier All Court Tennis 4-Ball Can'),
  20
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
