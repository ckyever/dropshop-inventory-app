const sendToPage = (
  response,
  pageView,
  { products, product, categories, brands, stores, defaultCategory, defaultBrand } = {},
  { title, redirect, showDeleteButton } = {},
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    product: product ?? {},
    categories: categories ?? {},
    defaultCategory: defaultCategory ?? null,
    brands: brands ?? {},
    defaultBrand: defaultBrand ?? null,
    stores: stores ?? {},
    showDeleteButton: showDeleteButton ?? false,
    redirect: redirect ?? null, 
    title: title ?? null,
  });
};

export { sendToPage };
