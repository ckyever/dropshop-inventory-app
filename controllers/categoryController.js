import { getCategories, insertCategory, deleteCategoryById } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getCategoryPage = async (req, res) => {
  const categories = await getCategories();
  sendToPage(res, "pages/category", { categories: categories}, {showModifyLinks: true});
};

const getNewCategoryPage = async (req, res) => {
  sendToPage(res, "pages/new-category");
};

const addNewCategory = async (req, res) => {
  const formData = req.body;
  await insertCategory(formData);
  res.redirect("/category");
};

const deleteCategory = async (req, res) => {
  await deleteCategoryById(req.query.id);
  const previousPath = req.headers.referer;
  if (previousPath) {
    res.redirect(previousPath);
  } else {
    res.redirect("/category");
  }
};


export { getCategoryPage, getNewCategoryPage, addNewCategory, deleteCategory };
