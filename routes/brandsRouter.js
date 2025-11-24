import { Router } from "express";
import { getBrandsPage } from "../controllers/brandsController.js";

const brandsRouter = Router();
brandsRouter.get("/", getBrandsPage);

export { brandsRouter };
