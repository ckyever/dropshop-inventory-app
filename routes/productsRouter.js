import { Router } from "express";
import {
  getProductsPage,
  getNewProductPage,
  addNewProduct,
  deleteProduct,
  getUpdateProductPage,
  updateProduct
} from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/", getProductsPage);
productsRouter.get("/new", getNewProductPage);
productsRouter.post("/new", addNewProduct);
productsRouter.get("/delete", deleteProduct);
productsRouter.get("/delete", deleteProduct);
productsRouter.get("/:id/update", getUpdateProductPage);
productsRouter.post("/:id/update", updateProduct);

export { productsRouter };
