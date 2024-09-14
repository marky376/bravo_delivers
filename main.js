// Home slider animation
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
});

// Cart Functionality
let cart = [];

// Open/Close Cart
const cartIcon = document.querySelector('.fa-shopping-cart');
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
document.body.appendChild(cartContainer);

// Cart Template
function updateCartUI() {
  cartContainer.innerHTML = `
    <div class="cart-header">
      <h3>Your Cart</h3>
      <button class="close-cart">X</button>
    </div>
    <ul class="cart-items">
      ${cart.map((item, index) => `
        <li class="cart-item">
          <span>${item.name}</span>
          <span>$${item.price}</span>
          <button class="remove-item" data-index="${index}">Remove</button>
        </li>
          `).join('')}
    </ul>
    <div class="cart-total">
        <h4>Total: $${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
    </div>
  `;
}