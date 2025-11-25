import { sendToPage } from "./utils.js";

const getHomePage = (req, res) => {
  sendToPage(res, "pages/home");
};

export { getHomePage };
