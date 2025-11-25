import { getStores } from "../db/queries.js";
import { sendToPage } from "./utils.js";

const getStoresPage = async (req, res) => {
  const stores = await getStores();
  sendToPage(res, "pages/stores", { stores: stores });
};

export { getStoresPage };
