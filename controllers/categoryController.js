const getCategoryPage = (req, res) => {
  res.render("index", { content: "pages/category" });
};

export { getCategoryPage };
