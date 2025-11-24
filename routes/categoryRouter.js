import { Router } from "express";
import { getCategoryPage } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/", getCategoryPage);

export { categoryRouter };
