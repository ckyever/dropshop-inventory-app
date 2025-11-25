import { getProducts } from "../db/queries.js";

const getProductsPage = async (req, res) => {
  res.render("index", {
    content: "pages/products",
    products: await getProducts(
      req.query.category,
      req.query.brand,
      req.query.store
    ),
    categories: {},
    brands: {},
    stores: {},
  });
};

export { getProductsPage };
