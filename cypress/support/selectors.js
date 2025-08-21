// cypress/support/selectors.js
export const LoginSelectors = {
  email: "[data-qa='login-email']",
  password: "[data-qa='login-password']",
  submit: "[data-qa='login-button']",
  loginForm: ".login-form",
  loggedInAs: "a:contains('Logged in as'), span:contains('Logged in as')",
};

export const CartSelectors = {
  container: ".cart_info",                              
  itemRow: "tr.cart_item",                              
  itemDescription: ".cart_description",                 
  removeBtn: ".cart_quantity_delete, .cart_delete a",   
  checkoutBtn: "button.check_out, .btn.check_out, a.check_out", 
};

export const SearchSelectors = {
  productsLink: "a[href='/products']",
  searchInput: "#search_product",
  searchButton: "#submit_search",
  productWrapper: ".features_items .product-image-wrapper",
  continueShoppingBtn:
    "button.close-modal, button:contains('Continue Shopping')",
};
