import { getProducts, insertProduct } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getProductsPage = async (req, res) => {
  const products = await getProducts(
    req.query.category,
    req.query.brand,
    req.query.store
  );
  sendToPage(res, "pages/products", { products: products });
};

const getNewProductPage = (req, res) => {
  sendToPage(res, "pages/new-product");
};

const addNewProduct = async (req, res) => {
  const formData = req.body;
  await insertProduct(formData);
  res.redirect("/products");
};

export { getProductsPage, getNewProductPage, addNewProduct };
