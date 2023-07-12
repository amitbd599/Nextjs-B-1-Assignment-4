import products from "./products.js";
import { addToCart } from "./cart.js";

function displayProducts() {
  const productList = document.getElementById("product-list");

  for (const product of products) {
    const { image, name, price } = product;
    const singleProduct = `
        <div class="col-sm-6 col-md-6 col-lg-6 col-xs-6">
          <div class="shadow-sm card mb-3 product">
            <img class="product-img" src=${image} alt="prd1" />
            <div class="card-body">
              <h5 class="card-title text-info bold product-name">
                ${name}
              </h5>
              <p class="card-text text-success product-price">${price} $</p>
              <button
                class="btn myBtn mt-2 float-right"
                type="button"
                id="add-to-cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
    `;
    productList.insertAdjacentHTML("beforeend", singleProduct);
  }

  // add to cart
  const addToCartButton = document.querySelectorAll("#add-to-cart");
  addToCartButton.forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", () => {
      const productDom = addToCartButton.parentNode.parentNode;
      addToCart(productDom);
    });
  });
}

// loaded content
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
});
