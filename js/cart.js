let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const addToCartBtnDom = document.querySelectorAll("#add-to-cart");

export const addToCart = (productDom) => {
  const product = {
    img: productDom.querySelector(".product-img").getAttribute("src"),
    name: productDom.querySelector(".product-name").innerText,
    price: productDom.querySelector(".product-price").innerText,
    quantity: 1,
  };
  const InsertToCart =
    cart.filter((cartItem) => cartItem.name === product.name).length > 0;
  if (InsertToCart === false) {
    cartDom.insertAdjacentHTML(
      "beforeend",
      `
            <div class="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 animated flipInX">
              <div class="p-2">
                  <img src="${product.img}" alt="${product.name}" style="max-width: 50px;"/>
              </div>
              <div class="p-2 mt-3">
                  <p class="text-info cart_item_name">${product.name}</p>
              </div>
              <div class="p-2 mt-3">
                  <p class="text-success cart_item_price">${product.price}</p>
              </div>
              <div class="p-2 mt-3 ml-auto">
                  <button class="btn badge badge-secondary" type="button" id="increase-item">&plus;
              </div>
              <div class="p-2 mt-3">
                <p class="text-success cart_item_quantity">${product.quantity}</p>
              </div>
              <div class="p-2 mt-3">
                <button class="btn badge badge-info" type="button" id="decrease-item">&minus;
              </div>
              <div class="p-2 mt-3">
                <button class="btn badge badge-danger" type="button" id="remove-item">&times;
              </div>
            </div> `
    );

    if (document.querySelector(".cart-footer") === null) {
      cartDom.insertAdjacentHTML(
        "afterend",
        `
        <div class="d-flex flex-row shadow-sm card cart-footer mt-2 mb-3 animated flipInX">
          <div class="p-2">
            <button class="btn badge-danger clear" type="button" id="clear-cart">Clear Cart
          </div>
          <div class="p-2 ml-auto">
            <button class=" btn btn-secondary " type="button" id="check-out">Total Amount <span class="pay"></span> 
              
          </div>
        </div>`
      );
    }
    cart.push(product);

    const cartItemsDom = cartDom.querySelectorAll(".cart-items");
    cartItemsDom.forEach((cartItemDom) => {
      if (
        cartItemDom.querySelector(".cart_item_name").innerText === product.name
      ) {
        cartTotal +=
          parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText) *
          parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
        document.querySelector(".pay").innerText = cartTotal + " $.";

        // increase item in cart
        cartItemDom
          .querySelector("#increase-item")
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                cartItemDom.querySelector(".cart_item_quantity").innerText =
                  ++cartItem.quantity;
                cartItemDom.querySelector(".cart_item_price").innerText =
                  parseInt(cartItem.quantity) * parseInt(cartItem.price) + " $";
                cartTotal += parseInt(cartItem.price);
                document.querySelector(".pay").innerText = cartTotal + " $";
              }
            });
          });

        // decrease item in cart
        cartItemDom
          .querySelector("#decrease-item")
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                  cartItemDom.querySelector(".cart_item_quantity").innerText =
                    --cartItem.quantity;
                  cartItemDom.querySelector(".cart_item_price").innerText =
                    parseInt(cartItem.quantity) * parseInt(cartItem.price) +
                    " $";
                  cartTotal -= parseInt(cartItem.price);
                  document.querySelector(".pay").innerText = cartTotal + " $";
                }
              }
            });
          });

        //remove item from cart
        cartItemDom
          .querySelector("#remove-item")
          .addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                cartTotal -= parseInt(
                  cartItemDom.querySelector(".cart_item_price").innerText
                );
                document.querySelector(".pay").innerText = cartTotal + " $";
                cartItemDom.remove();
                cart = cart.filter(
                  (cartItem) => cartItem.name !== product.name
                );
                addToCartBtnDom.innerText = "Add to cart";
                addToCartBtnDom.disabled = false;
              }
              if (cart.length < 1) {
                document.querySelector(".cart-footer").remove();
              }
            });
          });

        //clear cart
        document.querySelector("#clear-cart").addEventListener("click", () => {
          cartItemDom.remove();
          cart = [];
          cartTotal = 0;
          if (document.querySelector(".cart-footer") !== null) {
            document.querySelector(".cart-footer").remove();
          }
          addToCartBtnDom.innerText = "Add to cart";
          addToCartBtnDom.disabled = false;
        });
      }
    });
  }
};
