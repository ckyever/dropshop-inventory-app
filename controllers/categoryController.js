import { getCategories, insertCategory } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getCategoryPage = async (req, res) => {
  const categories = await getCategories();
  sendToPage(res, "pages/category", { categories: categories });
};

const getNewCategoryPage = async (req, res) => {
  sendToPage(res, "pages/new-category");
};

const addNewCategory = async (req, res) => {
  const formData = req.body;
  await insertCategory(formData);
  res.redirect("/category");
};

export { getCategoryPage, getNewCategoryPage, addNewCategory };
