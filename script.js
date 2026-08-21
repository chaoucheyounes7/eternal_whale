let cartCount = 0;
const cartCountElement = document.getElementById("cart-count");
const addButtons = document.querySelectorAll("button");

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    cartCount = cartCount + 1;
    cartCountElement.textContent = cartCount;

    const productName = button.dataset.product;
    const productPrice = button.dataset.price;

    alert(productName + " أُضيف إلى السلة — السعر: " + productPrice);
  });
});
