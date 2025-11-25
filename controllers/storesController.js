const getStoresPage = (req, res) => {
  res.render("index", {
    content: "pages/stores",
    products: {},
    categories: {},
  });
};

export { getStoresPage };
