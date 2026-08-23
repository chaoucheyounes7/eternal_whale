let cart = [];

const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const addButtons = document.querySelectorAll("button");

function renderCart() {
  cartItemsElement.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + " — " + item.price + " × " + item.quantity;
    cartItemsElement.appendChild(listItem);

    total = total + item.price * item.quantity;
    itemCount = itemCount + item.quantity;
  });

  cartCountElement.textContent = itemCount;
  cartTotalElement.textContent = total;
}

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;
    const productPrice = Number(button.dataset.price);

    const existingItem = cart.find(function (item) {
      return item.name === productName;
    });

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }

    renderCart();
  });
});
