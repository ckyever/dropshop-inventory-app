import { pool } from "./pool.js";

async function getProducts(categoryId, brandId, storeId) {
  let condition = "1=1";

  if (categoryId) {
    condition += ` AND category.id = ${categoryId}`;
  }
  if (brandId) {
    condition += ` AND brand.id = ${brandId}`;
  }
  if (storeId) {
    condition += ` AND stock_levels.store_id = ${storeId}`;
  }

  const { rows } = await pool.query(
    `SELECT product.* 
     FROM product 
     LEFT JOIN category ON (category.id = product.category_id)
     LEFT JOIN brand ON (brand.id = product.brand_id)
     LEFT JOIN stock_levels ON (stock_levels.product_id = product.id)
     WHERE ${condition}`
  );
  return rows;
}

async function insertProduct({
  name,
  description,
  image,
  price,
  categoryId,
  brandId,
}) {
  await pool.query(
    "INSERT INTO product (name, description, image, price, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, description, image, price, categoryId, brandId]
  );
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

export { getProducts, insertProduct, getCategories, getBrands, getStores };
