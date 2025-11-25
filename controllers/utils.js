const sendToPage = (
  response,
  pageView,
  { products, categories, brands, stores } = {}
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    categories: categories ?? {},
    brands: brands ?? {},
    stores: stores ?? {},
  });
};

export { sendToPage };
