import { sendToPage } from "./utils.js";
import { getCategories } from "../db/queries.js";

const getHomePage = async (req, res) => {
  const categories = await getCategories();
  sendToPage(res, "pages/home", { categories: categories });
};

export { getHomePage };
