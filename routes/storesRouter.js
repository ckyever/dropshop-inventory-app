import { Router } from "express";
import { getStoresPage } from "../controllers/storesController.js";

const storesRouter = Router();
storesRouter.get("/", getStoresPage);

export { storesRouter };
