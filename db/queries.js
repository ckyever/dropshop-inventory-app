import { pool } from "./pool.js";

async function getProducts() {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function getBrands() {
  const { rows } = await pool.query("SELECT * FROM brand");
  return rows;
}

async function getStores() {
  const { rows } = await pool.query("SELECT * FROM store");
  return rows;
}

export { getProducts, getCategories, getBrands, getStores };
