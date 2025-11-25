import { getProducts } from "../db/queries.js";

const getProductsPage = async (req, res) => {
  res.render("index", {
    content: "pages/products",
    products: await getProducts(),
    categories: {},
    brands: {},
    stores: {},
  });
};

export { getProductsPage };
