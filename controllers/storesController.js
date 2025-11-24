const getStoresPage = (req, res) => {
  res.render("index", { content: "pages/stores" });
};

export { getStoresPage };
