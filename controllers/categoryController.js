import { getCategories } from "../db/queries.js";

const getCategoryPage = async (req, res) => {
  res.render("index", {
    content: "pages/category",
    products: {},
    categories: await getCategories(),
    brands: {},
    stores: {},
  });
};

export { getCategoryPage };
