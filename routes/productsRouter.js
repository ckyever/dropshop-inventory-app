import { Router } from "express";
import { getProductsPage } from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/", getProductsPage);

export { productsRouter };
