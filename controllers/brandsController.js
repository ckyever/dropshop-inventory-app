import { getBrands } from "../db/queries.js";

const getBrandsPage = async (req, res) => {
  res.render("index", {
    content: "pages/brands",
    products: {},
    categories: {},
    brands: await getBrands(),
    stores: {},
  });
};

export { getBrandsPage };
