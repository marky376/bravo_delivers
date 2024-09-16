// Initialize Swiper for Home Slider
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

// Create Cart UI Elements
const cartIcon = document.querySelector('.fa-shopping-cart');
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
cartContainer.style.display = 'none';
document.body.appendChild(cartContainer);

// Function to update the Cart UI
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
  const cartCounter = cartIcon.querySelector('.cart-counter') || document.createElement('span');
  cartCounter.classList.add('cart-counter');
  cartCounter.innerText = cart.length;
  if (!cartIcon.contains(cartCounter)) {
    cartIcon.appendChild(cartCounter);
  }

  // Attach event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.index);
    });
  });

  // Attach event listener to close cart button
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

// Toggle Cart Visibility
cartIcon.addEventListener('click', () => {
  cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

// Add Items to Cart from Buttons
document.querySelectorAll('.btn.add-t-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent default link behavior
    const card = button.closest('.card');
    const item = {
      name: card.querySelector('h3').innerText,
      price: parseFloat(card.querySelector('h2').innerText.replace('$', ''))
    };
    addToCart(item);
  });
});

// Show Order Confirmation
function showOrderConfirmation() {
  const orderSummary = document.getElementById('order-summary');
  orderSummary.innerHTML = cart.map(item => `
    <li>
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    </li>
  `).join('');

  document.getElementById('order-confirmation').style.display = 'block';
}

// Event Listener for Order Confirmation
document.querySelectorAll('.btn.add-t-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    showOrderConfirmation();
  });
});

// Event Listener for Canceling the Order
document.getElementById('cancel-order').addEventListener('click', () => {
  document.getElementById('order-confirmation').style.display = 'none';
});

// Handle Form Submission
document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission here (e.g., send data to server)
  alert('Order submitted successfully!');
  cart = [];
  updateCartUI();
  document.getElementById('order-confirmation').style.display = 'none';
});

// Search Functionality
const searchIcon = document.querySelector('.fa-search');
const searchContainer = document.createElement('div');
searchContainer.classList.add('search-container');
document.body.appendChild(searchContainer);

// Function to Update Search Container
function updateSearch() {
  searchContainer.innerHTML = `
    <div class="search-header">
      <h3>Search</h3>
      <button id="close-search" class="close-search">X</button>
    </div>
    <input type="text" id="search-input" name="search" placeholder="Search for Items..." class="search-input">
    <button id="search-submit" class="search-submit">Search</button>
  `;
  searchContainer.style.display = 'none';  // Hide initially
}

// Toggle Search Container Visibility
searchIcon.addEventListener('click', () => {
  if (searchContainer.style.display === 'none') {
    updateSearch();  // Ensure search template is up to date
    searchContainer.style.display = 'block';
  } else {
    searchContainer.style.display = 'none';
  }
});

// Close Search Container on Click Outside
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
    searchContainer.style.display = 'none';
  }
});

// Perform Search
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'search-submit') {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const itemName = card.querySelector('h3').innerText.toLowerCase();
      card.style.display = itemName.includes(searchTerm) ? '' : 'none';
    });
  }
});

// Initial setup
updateSearch();
