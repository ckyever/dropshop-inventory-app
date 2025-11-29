import { pool } from "./pool.js";

async function getProducts(categoryId, brandId, storeId, searchQuery) {
  const queryValues = [];

  let sql = `
    SELECT product.*, (SELECT SUM(quantity) FROM stock_levels WHERE product_id = product.id ${storeId ? `AND store_id = ${storeId}` : ''}) AS total_stock 
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

  sql += " ORDER BY product.id ASC"

  const { rows } = await pool.query(sql, queryValues);
  return rows;
}

async function getProductById(id) {
  const {rows} = await pool.query("SELECT * FROM product WHERE id = $1", [id]);
  return rows[0];
}

async function insertProduct({
  name,
  image,
  price,
  categoryId,
  brandId,
}) {
  // If IDs are empty strings insert them as null otherwise convert to Number
  categoryId = categoryId ? Number(categoryId) : null
  brandId = brandId ? Number(brandId) : null
  const { rows } = await pool.query(
    "INSERT INTO product (name, image, price, category_id, brand_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [name, image, price, categoryId, brandId]
  );
  return rows[0].id;
}

async function deleteProductById(id) {
  await pool.query("DELETE FROM product WHERE id = $1", [id]);
}

async function updateProductById(id, {name, image, price, categoryId, brandId}) {
  await pool.query("UPDATE product SET name = $1, image = $2, price = $3, category_id = $4, brand_id = $5 WHERE id = $6", [name, image, price, Number(categoryId), Number(brandId), id]);
}

async function getCategories() {
  const { rows } = await pool.query(`
    SELECT
      category.*,
      (SELECT product.image FROM product WHERE product.category_id = category.id ORDER BY id LIMIT 1)
    FROM
      category
    ORDER BY
      id
  `);
  return rows;
}

async function getCategoryById(id) {
  const {rows} = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
  return rows[0];
}

async function deleteCategoryById(id) {
  await pool.query("DELETE FROM category WHERE id = $1", [id]);
}

async function insertCategory({name}) {
  await pool.query("INSERT INTO category (name) VALUES ($1)", [name]);
}

async function updateCategoryById(id, {name}) {
  await pool.query("UPDATE category SET name = $1 WHERE id = $2", [name, id]);
}

async function getBrands() {
  const { rows } = await pool.query("SELECT * FROM brand ORDER BY id");
  return rows;
}

async function getStores() {
  const { rows } = await pool.query("SELECT * FROM store ORDER BY id");
  return rows;
}

async function getStoresByProductId(productId) {
  const { rows } = await pool.query(`
    SELECT store.id, store.name, stock_levels.quantity
    FROM
      stock_levels
      LEFT JOIN store ON (store.id = stock_levels.store_id)
    WHERE
      stock_levels.product_id = $1
    ORDER BY
      store.id
  `, [productId]);
  return rows;
}

async function insertStockLevel(storeId, productId, quantity) {
  await pool.query("INSERT INTO stock_levels (store_id, product_id, quantity) VALUES ($1, $2, $3)", [Number(storeId), Number(productId), Number(quantity)]);
}

async function deleteStockLevelsForProduct(productId) {
  await pool.query("DELETE FROM stock_levels WHERE product_id = $1", [productId]);
}

export {
  getProducts,
  getProductById,
  insertProduct,
  deleteProductById,
  updateProductById,
  getCategories,
  getCategoryById,
  deleteCategoryById,
  insertCategory,
  updateCategoryById,
  getBrands,
  getStores,
  getStoresByProductId,
  insertStockLevel,
  deleteStockLevelsForProduct,
};
