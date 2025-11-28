import { Router } from "express";
import { getCategoryPage, getNewCategoryPage, addNewCategory, deleteCategory, getUpdateCategoryPage, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/", getCategoryPage);
categoryRouter.get("/new", getNewCategoryPage);
categoryRouter.post("/new", addNewCategory);
categoryRouter.get("/delete", deleteCategory);
categoryRouter.get("/:id/update", getUpdateCategoryPage);
categoryRouter.post("/:id/update", updateCategory);

export { categoryRouter };
