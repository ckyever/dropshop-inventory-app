import { getStores } from "../db/queries.js";

const getStoresPage = async (req, res) => {
  res.render("index", {
    content: "pages/stores",
    products: {},
    categories: {},
    brands: {},
    stores: await getStores(),
  });
};

export { getStoresPage };
