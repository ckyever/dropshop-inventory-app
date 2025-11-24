const getProductsPage = (req, res) => {
  res.render("index", { content: "pages/products" });
};

export { getProductsPage };
