#! /usr/bin/env node

import "dotenv/config";
import { Client } from "pg";

const SQL = `
DROP TABLE IF EXISTS stock_levels;
DROP TABLE IF EXISTS store;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS brand;
DROP TABLE IF EXISTS category;
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
