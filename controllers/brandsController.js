const getBrandsPage = (req, res) => {
  res.render("index", {
    content: "pages/brands",
    products: {},
    categories: {},
  });
};

export { getBrandsPage };
