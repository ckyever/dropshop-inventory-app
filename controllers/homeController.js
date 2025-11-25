const getHomePage = (req, res) => {
  res.render("index", { content: "pages/home", products: {}, categories: {} });
};

export { getHomePage };
