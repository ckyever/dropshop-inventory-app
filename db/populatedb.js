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
  name VARCHAR(255),
  image VARCHAR(255)
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

INSERT INTO brand (name, image) VALUES ('Wilson', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Wilson-logo.svg/2560px-Wilson-logo.svg.png');
INSERT INTO brand (name, image) VALUES ('Babolat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Babolat_logo.svg/2560px-Babolat_logo.svg.png');
INSERT INTO brand (name, image) VALUES ('Head', 'https://upload.wikimedia.org/wikipedia/de/7/73/Head_%28Sportartikelhersteller%29_logo.svg');
INSERT INTO brand (name, image) VALUES ('Yonex', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo-Yonex.svg/960px-Logo-Yonex.svg.png');
INSERT INTO brand (name, image) VALUES ('Luxilon', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXspTjFPGy6ZoCJIpCeVbTHeamqFspTiXCTQ&s');
INSERT INTO brand (name, image) VALUES ('Nike', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg');
INSERT INTO brand (name, image) VALUES ('Adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg');
INSERT INTO brand (name, image) VALUES ('ASICS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/2560px-Asics_Logo.svg.png');
INSERT INTO brand (name, image) VALUES ('Slazenger', 'https://upload.wikimedia.org/wikipedia/de/e/e4/Slazenger_Logo.svg');
INSERT INTO brand (name, image) VALUES ('Dunlop', 'https://upload.wikimedia.org/wikipedia/commons/1/13/Dunlop_brand_logo.svg');

INSERT INTO store (name, address)
VALUES ('Melbourne Store', '123 Flinders St, Melbourne, Australia');
INSERT INTO store (name, address)
VALUES ('Wimbledon Store', 'The All England Lawn Tennis Club, Wimbledon, England');

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson Pro Staff 85 6.0',
  'https://www.tennisnerd.net/wp-content/uploads/2022/06/Screenshot-2022-06-14-at-14.49.23.png',
  400.00,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson Pro Staff 85 6.0'),
  3
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson Pro Staff 85 6.0'),
  5
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Babolat AeroPro Drive',
  'https://img.tennis-warehouse.com/new_big/BAPDGT-1.jpg',
  312.00,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Babolat' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Babolat AeroPro Drive'),
  6
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Babolat AeroPro Drive'),
  1
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson K Factor Six-One 90',
  'https://i.pinimg.com/736x/15/ef/39/15ef39651205a163de404654a881ed32.jpg',
  375.00,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson K Factor Six-One 90'),
  0
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson K Factor Six-One 90'),
  1
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Head Speed Pro',
  'https://img.tennisonly.com.au/watermark/rs.php?path=HSPDP-1.jpg&nw=455',
  308.95,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Head' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Head Speed Pro'),
  20
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Head Speed Pro'),
  7
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Yonex EZONE 98',
  'https://img.tennisonly.com.au/watermark/rs.php?path=LEZ98B-1.jpg&nw=455',
  275.00,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Yonex' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Yonex EZONE 98'),
  30
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Yonex EZONE 98'),
  27
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Babolat Pure Drive GT',
  'https://img.tennis-warehouse.com/new_big/BPD11-1.jpg',
  289.95,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Babolat' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Babolat Pure Drive GT'),
  8
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Babolat Pure Drive GT'),
  11
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Yonex VCORE 95',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=YVC95-1.jpg&nw=540',
  289.95,
  (SELECT id from category WHERE name = 'Racquets' LIMIT 1),
  (SELECT id from brand WHERE name = 'Yonex' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Yonex VCORE 95'),
  15
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Yonex VCORE 95'),
  21
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Dunlop Australian Open 3 Ball Can',
  'https://img.tennisonly.com.au/watermark/rs.php?path=DAO3BC-1.jpg&nw=455',
  13.95,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Dunlop' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Dunlop Australian Open 3 Ball Can'),
  89
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Dunlop Australian Open 3 Ball Can'),
  5
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson Roland Garros Clay 3 Ball Can',
  'https://img.tenniswarehouse-europe.com/watermark/rs.php?path=WRGAC3BC-1.jpg&nw=455',
  13.00,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson Roland Garros Clay 3 Ball Can'),
  22
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson Roland Garros Clay 3 Ball Can'),
  0
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Slazenger Wimbledon 3 Ball Can',
  'https://img.tennisonly.com.au/watermark/rs.php?path=SWG3B-1.jpg&nw=500',
  14.50,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Slazenger' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Slazenger Wimbledon 3 Ball Can'),
  28
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Slazenger Wimbledon 3 Ball Can'),
  107
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
  12.95,
  (SELECT id from category WHERE name = 'Tennis Balls' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson US Open Regular Duty Single Can'),
  60
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson US Open Regular Duty Single Can'),
  19
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Luxilon Big Banger Original 16L String',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=BB16-NA-1.jpg&nw=540',
  41.95,
  (SELECT id from category WHERE name = 'Strings' LIMIT 1),
  (SELECT id from brand WHERE name = 'Luxilon' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Luxilon Big Banger Original 16L String'),
  23
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Luxilon Big Banger Original 16L String'),
  8
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Wilson Natural Gut 17L String',
  'https://au.wilson.com/cdn/shop/files/WRZ999900E_0_Natural_Gut_17_PKG.png.cq5dam.web.1200.1200_grande.jpg?v=1690935676',
  110.99,
  (SELECT id from category WHERE name = 'Strings' LIMIT 1),
  (SELECT id from brand WHERE name = 'Wilson' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Wilson Natural Gut 17L String'),
  13
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Wilson Natural Gut 17L String'),
  41
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Yonex Poly Tour Spin 16L String',
  'https://img.tennisonly.com.au/watermark/rs.php?path=YPTSB125-1.jpg&nw=455',
  35.00,
  (SELECT id from category WHERE name = 'Strings' LIMIT 1),
  (SELECT id from brand WHERE name = 'Yonex' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Yonex Poly Tour Spin 16L String'),
  20
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Yonex Poly Tour Spin 16L String'),
  39
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Asics Gel Resolution X White/Black',
  'https://img.tennis-warehouse.com/watermark/rs.php?path=AGRXWHB-1.jpg&nw=540',
  230.00,
  (SELECT id from category WHERE name = 'Shoes' LIMIT 1),
  (SELECT id from brand WHERE name = 'ASICS' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Asics Gel Resolution X White/Black'),
  78
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Asics Gel Resolution X White/Black'),
  54
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Nike Vapor Pro Red',
  'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/bf64562d-0872-4430-b681-2e841969c2bb/W+ZOOM+VAPOR+PRO+3+HC+PRM.png',
  225.98,
  (SELECT id from category WHERE name = 'Shoes' LIMIT 1),
  (SELECT id from brand WHERE name = 'Nike' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Nike Vapor Pro Red'),
  29
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Nike Vapor Pro Red'),
  50
);

INSERT INTO product (
  name,
  image,
  price,
  category_id,
  brand_id
) VALUES (
  'Adidas US Open Barricade',
  'https://cdn.clothbase.com/uploads/6fdc9d3d-358e-4ecc-a55e-a2d4c0ada911/31-08-2017_adidasxpharrelwilliams_usopenbarricade2017_chalkwhitedarkblue_red_s81004_sh_1.jpg',
  219.50,
  (SELECT id from category WHERE name = 'Shoes' LIMIT 1),
  (SELECT id from brand WHERE name = 'Adidas' LIMIT 1)
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Melbourne Store'),
  (SELECT id FROM product WHERE name = 'Adidas US Open Barricade'),
  2
);
INSERT INTO stock_levels (store_id, product_id, quantity)
VALUES (
  (SELECT id FROM store WHERE name = 'Wimbledon Store'),
  (SELECT id FROM product WHERE name = 'Adidas US Open Barricade'),
  0
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
