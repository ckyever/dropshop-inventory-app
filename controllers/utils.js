const sendToPage = (
  response,
  pageView,
  { products, product, categories, category, brands, stores, defaultCategory, defaultBrand } = {},
  { title, redirect, showModifyLinks, previousQuery, isStoreView } = {},
) => {
  response.render("index", {
    content: pageView,
    products: products ?? {},
    product: product ?? {},
    categories: categories ?? {},
    category: category ?? {},
    defaultCategory: defaultCategory ?? null,
    brands: brands ?? {},
    defaultBrand: defaultBrand ?? null,
    stores: stores ?? {},
    showModifyLinks: showModifyLinks ?? false,
    redirect: redirect ?? null, 
    title: title ?? null,
    previousQuery: previousQuery ?? null,
    isStoreView: isStoreView ?? false
  });
};

export { sendToPage };
