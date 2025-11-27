import { pool } from "./pool.js";

async function getProducts(categoryId, brandId, storeId, searchQuery) {
  const queryValues = [];

  let sql = `
    SELECT product.* 
    FROM product 
    LEFT JOIN category ON (category.id = product.category_id)
    LEFT JOIN brand ON (brand.id = product.brand_id)
    WHERE 1 = 1
  `;

  if (categoryId) {
    sql += ` AND category.id = ${categoryId}`;
  }
  if (brandId) {
    sql += ` AND brand.id = ${brandId}`;
  }
  if (storeId) {
    sql += ` AND product.id IN (SELECT product_id FROM stock_levels WHERE store_id = ${storeId})`;
  }

  if (searchQuery) {
    sql +=
      "AND (product.name ILIKE $1 OR category.name ILIKE $2 OR brand.name ILIKE $3)";
    const regex = `%${searchQuery}%`;
    queryValues.push(regex, regex, regex);
  }

  const { rows } = await pool.query(sql, queryValues);
  return rows;
}

async function insertProduct({
  name,
  description,
  image,
  price,
  category,
  brand,
}) {
  await pool.query(
    "INSERT INTO product (name, description, image, price, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, description, image, price, category, brand]
  );
}

async function deleteProductById(id) {
  await pool.query("DELETE FROM product WHERE id = $1", [id]);
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function deleteCategoryById(id) {
  await pool.query("DELETE FROM category WHERE id = $1", [id]);
}

async function insertCategory({name}) {
  await pool.query("INSERT INTO category (name) VALUES ($1)", [name]);
}

async function getBrands() {
  const { rows } = await pool.query("SELECT * FROM brand");
  return rows;
}

async function getStores() {
  const { rows } = await pool.query("SELECT * FROM store");
  return rows;
}

export {
  getProducts,
  insertProduct,
  deleteProductById,
  getCategories,
  deleteCategoryById,
  insertCategory,
  getBrands,
  getStores,
};
