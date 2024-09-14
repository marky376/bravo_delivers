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
const cartCounter = document.createElement('span');
cartCounter.classList.add('cart-counter');
cartIcon.appendChild(cartCounter);  // Adding counter to the cart icon

const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
cartContainer.style.display = 'none';  // Hide cart initially
document.body.appendChild(cartContainer);

// Update the Cart UI
function updateCartUI() {
  cartContainer.innerHTML = `
    <div class="cart-header">
      <h3>Your Cart</h3>
      <button class="close-cart">X</button>
    </div>
    <ul class="cart-items">
      ${cart.length > 0 ? cart.map((item, index) => `
        <li class="cart-item">
          <span>${item.name}</span>
          <span>$${item.price.toFixed(2)}</span>
          <button class="remove-item" data-index="${index}">Remove</button>
        </li>
      `).join('') : '<li>Your cart is empty</li>'}
    </ul>
    <div class="cart-total">
      <h4>Total: $${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
    </div>
  `;

  // Update cart icon counter
  cartCounter.innerText = cart.length;

  // Remove item functionality
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      removeFromCart(index);
    });
  });

  // Close cart functionality
  document.querySelector('.close-cart').addEventListener('click', () => {
    cartContainer.style.display = 'none';
  });
}

// Add Item to Cart
function addToCart(item) {
  cart.push(item);
  updateCartUI();
  cartContainer.style.display = 'block';  // Show cart when an item is added
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Event Listener to open/close the cart when clicking the cart icon
cartIcon.addEventListener('click', () => {
  cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

// Example: Adding items to cart (this should be tied to the "Order Now" button on your page)
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();  // Prevents default link behavior
    const card = button.closest('.card');  // Find the nearest card element
    const item = {
      name: card.querySelector('h3').innerText,
      price: parseFloat(card.querySelector('h2').innerText.replace('$', ''))
    };
    addToCart(item);
  });
});


// Show confirmation form
function showOrderConfirmation() {
  const orderSummary = document.getElementById('order-summary');
  orderSummary.innerHTML = cart.map(item => `
    <Li>
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    </Li>
    `).join('');

    document.getElementById('order-confirmation').style.display = 'block';

}

// Event Listener for "Add to Cart" button
document.querySelectorAll(.btn).forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    showOrderConfirmation();
  });
});


// Event Listener for canceling the order
document.getElementById('cancel-order').addEventListener('click', () => {
  document.getElementById('order-confirmation').style.display = 'none';

});

// Handle form submission
document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault()
  // Handle form submission here (e.g. send data to server)
  alert('Order submitted successfully!');
  cart = [];
  updateCartUI();
  document.getElementById('order-confirmation').style.display = 'none';
})