export const staticPageRoute = [
  "/",
  "/search-product",
  "/product-details",
  "/about-us",
  "/faq",
  "/contact-us",
];
export const accountPageRoute = [
  "edit-profile",
  "address-book",
  "add-address",
  "my-orders",
  "order-details",
];

export function getText(html) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || "";
}
