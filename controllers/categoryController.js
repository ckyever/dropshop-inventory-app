import { getCategories } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getCategoryPage = async (req, res) => {
  const categories = await getCategories();
  sendToPage(res, "pages/category", { categories: categories });
};

export { getCategoryPage };
