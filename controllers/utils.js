const sendToPage = (
  response,
  pageView,
  { products, categories, brands, stores, defaultCategory, defaultBrand } = {},
  { redirect, showDeleteButton } = {},
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    categories: categories ?? {},
    defaultCategory: defaultCategory ?? null,
    brands: brands ?? {},
    defaultBrand: defaultBrand ?? null,
    stores: stores ?? {},
    showDeleteButton: showDeleteButton ?? false,
    redirect: redirect ?? null, 
  });
};

export { sendToPage };
