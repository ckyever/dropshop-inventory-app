import { Router } from "express";
import { getCategoryPage, getNewCategoryPage, addNewCategory, deleteCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/", getCategoryPage);
categoryRouter.get("/new", getNewCategoryPage);
categoryRouter.post("/new", addNewCategory);
categoryRouter.get("/delete", deleteCategory);

export { categoryRouter };
