import {
  getProducts,
  getProductById,
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

  sendToPage(res, "pages/products", { products: products, defaultCategory: req.query.category, defaultBrand: req.query.brand }, {title: req.query.title});
};

const getNewProductPage = async (req, res) => {
  const categories = await getCategories();
  const defaultCategory = req.query.category
  const brands = await getBrands();
  const defaultBrand = req.query.brand
  sendToPage(res, "pages/new-product", { categories, brands, defaultCategory, defaultBrand }, {redirect: req.headers.referer});
};

const addNewProduct = async (req, res) => {
  const formData = req.body;
  await insertProduct(formData);
  res.redirect(formData.redirect ?? "/products");
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

const updateProduct = async (req, res) => {
  const categories = await getCategories();
  const brands = await getBrands();
  const product = await getProductById(req.params.id);
  sendToPage(res, "pages/update-product", { product, categories, brands }, {redirect: req.headers.referer});
};

export { getProductsPage, getNewProductPage, addNewProduct, deleteProduct, updateProduct };
