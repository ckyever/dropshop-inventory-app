import {
  getProducts,
  insertProduct,
  deleteProductById,
  getCategories,
  getBrands,
} from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getProductsPage = async (req, res) => {
  const products = await getProducts(
    req.query.category,
    req.query.brand,
    req.query.store,
    req.query.search
  );
  sendToPage(res, "pages/products", { products: products });
};

const getNewProductPage = async (req, res) => {
  const categories = await getCategories();
  const brands = await getBrands();
  sendToPage(res, "pages/new-product", { categories, brands });
};

const addNewProduct = async (req, res) => {
  const formData = req.body;
  await insertProduct(formData);
  res.redirect("/products");
};

const deleteProduct = async (req, res) => {
  await deleteProductById(req.query.id);
  const previousPath = req.headers.referer;
  if (previousPath) {
    res.redirect(previousPath);
  } else {
    res.redirect("/products");
  }
};

export { getProductsPage, getNewProductPage, addNewProduct, deleteProduct };
