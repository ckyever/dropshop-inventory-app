import { getProducts } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getProductsPage = async (req, res) => {
  const products = await getProducts(
    req.query.category,
    req.query.brand,
    req.query.store
  );
  sendToPage(res, "pages/products", { products: products });
};

export { getProductsPage };
