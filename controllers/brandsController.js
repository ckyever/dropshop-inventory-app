import { getBrands } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getBrandsPage = async (req, res) => {
  const brands = await getBrands();
  sendToPage(res, "pages/brands", { brands: brands });
};

export { getBrandsPage };
