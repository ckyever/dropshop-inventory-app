import { pool } from "./pool.js";

async function getProducts() {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
}

export { getProducts };
