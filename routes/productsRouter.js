import { Router } from "express";
import {
  getProductsPage,
  getNewProductPage,
  addNewProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/", getProductsPage);
productsRouter.get("/new", getNewProductPage);
productsRouter.post("/new", addNewProduct);
productsRouter.get("/delete", deleteProduct);

export { productsRouter };
