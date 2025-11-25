import { pool } from "./pool.js";

async function getProducts() {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

export { getProducts, getCategories };
