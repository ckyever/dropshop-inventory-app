const sendToPage = (
  response,
  pageView,
  { products, categories, brands, stores } = {},
  { redirect, showDeleteButton } = {},
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    categories: categories ?? {},
    brands: brands ?? {},
    stores: stores ?? {},
    showDeleteButton: showDeleteButton ?? false,
    redirect: redirect ?? null, 
  });
};

export { sendToPage };
