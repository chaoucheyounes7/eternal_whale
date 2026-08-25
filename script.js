    const products = [
  { name: "منتج 1", price: 100, image: "FB_IMG_1777303594552.jpg" },
  { name: "منتج 2", price: 150, image: "953-1.png" },
  { name: "منتج 3", price: 200, image: "IMG20250128064400.jpg" },
  { name: "منتج 4", price: 250, image: "" },
  { name: "منتج 5", price: 300, image: "" },
  { name: "منتج 6", price: 350, image: "" },
  { name: "منتج 7", price: 400, image: "" },
  { name: "منتج 8", price: 450, image: "" },
  { name: "منتج 9", price: 500, image: "" },
  { name: "منتج 10", price: 550, image: "" },
  { name: "منتج 11", price: 600, image: "" },
  { name: "منتج 12", price: 650, image: "" },
  { name: "منتج 13", price: 700, image: "" },
  { name: "منتج 14", price: 750, image: "" },
  { name: "منتج 15", price: 800, image: "" },
  { name: "منتج 16", price: 850, image: "" },
  { name: "منتج 17", price: 900, image: "" },
  { name: "منتج 18", price: 950, image: "" },
  { name: "منتج 19", price: 1000, image: "" },
  { name: "منتج 20", price: 1050, image: "" }
];

const productsContainer = document.getElementById("products-container");

function renderProducts(list) {
  productsContainer.innerHTML = "";

  list.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "product";

    const image = document.createElement("img");
    image.className = "product-image";
    image.alt = product.name;
    image.src = product.image || "https://placehold.co/600x400?text=أضف+صورة";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = "السعر: " + product.price;

    const button = document.createElement("button");
    button.textContent = "أضف إلى السلة";
    button.dataset.product = product.name;
    button.dataset.price = product.price;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    productsContainer.appendChild(card);
 card.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") return;
  openGallery(product);
  });

});
}

renderProducts(products);


let cart = JSON.parse(localStorage.getItem("eternalCart")) || [];
const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
function saveCart() {
  localStorage.setItem("eternalCart", JSON.stringify(cart));
}


function renderCart() {
  cartItemsElement.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach(function (item, index) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + " — " + item.price + " × " + item.quantity + " ";

    const removeButton = document.createElement("button");
    removeButton.textContent = "حذف";
    removeButton.addEventListener("click", function () {
   cart.splice(index, 1);
saveCart();
renderCart();

    });

    listItem.appendChild(removeButton);
    cartItemsElement.appendChild(listItem);
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  cartCountElement.textContent = itemCount;
  cartTotalElement.textContent = total;
}

productsContainer.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") return;

  const productName = event.target.dataset.product;
  const productPrice = Number(event.target.dataset.price);
  const existingItem = cart.find(function (item) {
    return item.name === productName;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
saveCart();
  renderCart();
});

const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase().trim();
  const filteredProducts = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchText);
  });

  renderProducts(filteredProducts);
  noResults.style.display = filteredProducts.length === 0 ? "block" : "none";
});

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    formMessage.textContent = "أضف منتجًا إلى السلة أولًا قبل تأكيد الطلبية.";
    formMessage.style.color = "red";
    return;
  }

  const customerName = document.getElementById("name").value;
  const customerPhone = document.getElementById("phone").value;
  const customerWilaya = document.getElementById("wilaya").value;
  const customerMunicipality = document.getElementById("municipality").value;
  const quantity = document.getElementById("quantity").value;
  const color = document.getElementById("color").value;

  const orderItems = cart.map(function (item) {
    return item.name + " — الكمية: " + item.quantity + " — السعر: " + item.price;
  }).join("\n");

  const message =
    "طلبية جديدة من Eternal Whale\n\n" +
    "المنتجات:\n" + orderItems + "\n\n" +
    "الكمية المطلوبة: " + quantity + "\n" +
    "اللون المختار: " + color + "\n" +
    "الاسم: " + customerName + "\n" +
    "رقم الهاتف: " + customerPhone + "\n" +
    "الولاية: " + customerWilaya + "\n" +
    "البلدية: " + customerMunicipality;

  const whatsappUrl =
    "https://wa.me/213798283436?text=" + encodeURIComponent(message);

  window.open(whatsappUrl, "_blank");

  formMessage.textContent = "تم تجهيز الطلبية وإرسالها إلى WhatsApp.";
  formMessage.style.color = "green";
});


  

let galleryImages = [];
let currentImageIndex = 0;

const galleryModal = document.getElementById("gallery-modal");
const galleryTitle = document.getElementById("gallery-title");
const galleryImage = document.getElementById("gallery-image");
const galleryCounter = document.getElementById("gallery-counter");
const closeGallery = document.getElementById("close-gallery");
const previousImage = document.getElementById("previous-image");
const nextImage = document.getElementById("next-image");

function openGallery(product) {
  const image = product.image || "https://placehold.co/600x400?text=أضف+صورة";

  galleryImages = [image, image, image, image, image];
  currentImageIndex = 0;
  galleryTitle.textContent = product.name;
  updateGalleryImage();
  galleryModal.classList.add("show");
}

function updateGalleryImage() {
  galleryImage.src = galleryImages[currentImageIndex];
  galleryCounter.textContent = (currentImageIndex + 1) + " / " + galleryImages.length;
}

nextImage.addEventListener("click", function () {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateGalleryImage();
});

previousImage.addEventListener("click", function () {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryImage();
});

closeGallery.addEventListener("click", function () {
  galleryModal.classList.remove("show");
});

galleryModal.addEventListener("click", function (event) {
  if (event.target === galleryModal) {
    galleryModal.classList.remove("show");
  }
});
