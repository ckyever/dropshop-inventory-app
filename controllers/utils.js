const sendToPage = (
  response,
  pageView,
  { products, categories, brands, stores } = {},
  showDeleteButton = false
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    categories: categories ?? {},
    brands: brands ?? {},
    stores: stores ?? {},
    showDeleteButton,
  });
};

export { sendToPage };
