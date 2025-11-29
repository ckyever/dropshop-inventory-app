import {
  getProducts,
  getProductById,
  insertProduct,
  deleteProductById,
  updateProductById,
  getCategories,
  getBrands,
  getStores,
  insertStockLevel,
  getStoresByProductId,
  deleteStockLevelsForProduct,
} from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getProductsPage = async (req, res) => {
  const products = await getProducts(
    req.query.category,
    req.query.brand,
    req.query.store,
    req.query.search
  );

  sendToPage(res, "pages/products", { products: products, defaultCategory: req.query.category, defaultBrand: req.query.brand }, {title: req.query.title, previousQuery: req.query.search, isStoreView: !!req.query.store});
};

const getNewProductPage = async (req, res) => {
  const categories = await getCategories();
  const defaultCategory = req.query.category
  const brands = await getBrands();
  const defaultBrand = req.query.brand
  const stores = await getStores();
  sendToPage(res, "pages/new-product", { categories, brands, stores, defaultCategory, defaultBrand }, {redirect: req.headers.referer});
};

const createStockLevelData = async (productId, formData) => {
  const regex = /^(store-id-)(.*)$/;
  for (const[key, value] of Object.entries(formData)) {
    const match = key.match(regex);
    if (match) {
      await insertStockLevel(match[2], productId, value)
    }
  }
};

const addNewProduct = async (req, res) => {
  const formData = req.body;
  const productId = await insertProduct(formData);
  await createStockLevelData(productId, formData)
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

const getUpdateProductPage = async (req, res) => {
  const categories = await getCategories();
  const brands = await getBrands();
  const product = await getProductById(req.params.id);
  const stores = await getStoresByProductId(req.params.id);
  console.log(product)
  sendToPage(res, "pages/update-product", { product, categories, brands, stores }, {redirect: req.headers.referer});
};

const updateProduct = async (req, res) => {
  const formData = req.body;
  await updateProductById(formData.id, {name: formData.name, image: formData.image,price: formData.price, categoryId: formData.category, brandId: formData.brand});
  await deleteStockLevelsForProduct(formData.id);
  await createStockLevelData(formData.id, formData);
  res.redirect(formData.redirect ?? "/products");
}

export { getProductsPage, getNewProductPage, addNewProduct, deleteProduct, getUpdateProductPage, updateProduct };
