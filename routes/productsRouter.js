import { Router } from "express";
import {
  getProductsPage,
  getNewProductPage,
  addNewProduct,
} from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/", getProductsPage);
productsRouter.get("/new", getNewProductPage);
productsRouter.post("/new", addNewProduct);

export { productsRouter };
