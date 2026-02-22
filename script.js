// E-commerce Website JavaScript

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 11999,
        originalPrice: 17499,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation",
        badge: "Sale"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 26999,
        originalPrice: 33999,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Track your fitness goals with this advanced smartwatch",
        badge: "New"
    },
    {
        id: 3,
        name: "Premium Cotton T-Shirt",
        category: "clothing",
        price: 3999,
        originalPrice: 5399,
        rating: 4.7,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Comfortable and stylish cotton t-shirt",
        badge: "Popular"
    },
    {
        id: 4,
        name: "Designer Jeans",
        category: "clothing",
        price: 10799,
        originalPrice: 13499,
        rating: 4.4,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Classic designer jeans for everyday wear",
        badge: "Sale"
    },
    {
        id: 5,
        name: "Modern Coffee Table",
        category: "home",
        price: 40499,
        originalPrice: 53999,
        rating: 4.6,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
        description: "Elegant modern coffee table for your living room",
        badge: "Featured"
    },
    {
        id: 6,
        name: "Garden Plant Pots Set",
        category: "home",
        price: 6749,
        originalPrice: 9449,
        rating: 4.2,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        description: "Beautiful ceramic plant pots for your garden",
        badge: "Sale"
    },
    {
        id: 7,
        name: "Professional Basketball",
        category: "sports",
        price: 4724,
        originalPrice: 6074,
        rating: 4.8,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
        description: "Official size and weight basketball for professional play",
        badge: "Best Seller"
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        category: "sports",
        price: 8099,
        originalPrice: 10799,
        rating: 4.5,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        description: "Non-slip premium yoga mat for all types of yoga",
        badge: "Popular"
    }
];

// Shopping Cart
let cart = [];
let currentUser = null;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const checkoutModal = document.getElementById('checkoutModal');
const userModal = document.getElementById('userModal');
const overlay = document.getElementById('overlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    loadCartFromStorage();
    updateCartDisplay();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', openSearchModal);
    document.getElementById('searchClose').addEventListener('click', closeSearchModal);
    searchInput.addEventListener('input', handleSearch);
    
    // Cart functionality
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    
    // Checkout functionality
    document.getElementById('checkoutClose').addEventListener('click', closeCheckoutModal);
    document.getElementById('payBtn').addEventListener('click', processPayment);
    
    // User functionality
    document.getElementById('userBtn').addEventListener('click', openUserModal);
    document.getElementById('userClose').addEventListener('click', closeUserModal);
    
    // Overlay click to close modals
    overlay.addEventListener('click', closeAllModals);
    
    // Category filters
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', sortProducts);
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => filterByCategory(card.dataset.category));
    });
    
    // User tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    
    // Form submissions
    document.querySelector('.login-form').addEventListener('submit', handleLogin);
    document.querySelector('.register-form').addEventListener('submit', handleRegister);
    document.querySelector('.newsletter-form').addEventListener('submit', handleNewsletter);
    
    // Payment method selection
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const payBtn = document.getElementById('payBtn');
            if (this.value === 'cod') {
                payBtn.textContent = 'Place Order (COD)';
            } else {
                payBtn.textContent = 'Pay with eSewa';
            }
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Product Management
function loadProducts(filteredProducts = products) {
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">Rs. ${product.price.toLocaleString()}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">Rs. ${product.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search Functionality
function openSearchModal() {
    searchModal.classList.add('active');
    overlay.classList.add('active');
    searchInput.focus();
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    overlay.classList.remove('active');
    searchInput.value = '';
    loadProducts(); // Reset to show all products
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        loadProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    loadProducts(filteredProducts);
}

// Filter and Sort Products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredProducts = products;
    
    if (categoryFilter) {
        filteredProducts = products.filter(product => product.category === categoryFilter);
    }
    
    sortProducts(filteredProducts, sortFilter);
}

function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    filterProducts();
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function sortProducts(productsToSort = products, sortType = 'name') {
    let sortedProducts = [...productsToSort];
    
    switch (sortType) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    loadProducts(sortedProducts);
}

// Shopping Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        saveCartToStorage();
    }
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = 'Rs. 0';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
}

function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Cart UI
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Checkout Process
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
}

function processPayment() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    // Validate form
    if (!validateCheckoutForm(formData)) {
        showNotification('Please fill in all required fields correctly!', 'error');
        return;
    }
    
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Calculate total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Generate unique transaction ID
    const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Show loading state
    const payBtn = document.getElementById('payBtn');
    const originalText = payBtn.innerHTML;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payBtn.disabled = true;
    
    if (paymentMethod === 'cod') {
        // Handle Cash on Delivery
        processCashOnDelivery(total, transactionId, formData);
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
    } else {
        // Handle eSewa payment
        processEsewaPayment(total, transactionId, formData);
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
    }
}

// Add eSewa payment processing function
function processEsewaPayment(total, transactionId, customerData) {
    try {
        // eSewa configuration
        const esewaConfig = {
            amount: total.toFixed(2),
            tax_amount: (total * 0.13).toFixed(2), // 13% VAT
            product_service_charge: '0.00',
            product_delivery_charge: '100.00', // Fixed delivery charge
            product_code: 'EPAYTEST',
            success_url: window.location.protocol + '//' + window.location.host + '/e-commerce1/success.php',
            failure_url: window.location.protocol + '//' + window.location.host + '/e-commerce1/failure.php',
            secret_key: '8gBm/:&EnhH.1/q', // Your eSewa secret key
            total_amount: (total + (total * 0.13) + 100).toFixed(2)
        };

        // Generate signature
        const signature = createEsewaSignature(esewaConfig, transactionId);

        // Populate the hidden eSewa form
        document.getElementById('amount').value = esewaConfig.amount;
        document.getElementById('tax_amount').value = esewaConfig.tax_amount;
        document.getElementById('total_amount').value = esewaConfig.total_amount;
        document.getElementById('transaction_uuid').value = transactionId;
        document.getElementById('product_code').value = esewaConfig.product_code;
        document.getElementById('product_service_charge').value = esewaConfig.product_service_charge;
        document.getElementById('product_delivery_charge').value = esewaConfig.product_delivery_charge;
        document.getElementById('success_url').value = esewaConfig.success_url;
        document.getElementById('failure_url').value = esewaConfig.failure_url;
        document.getElementById('signature').value = signature;

        // Show processing notification
        showNotification('Redirecting to eSewa payment gateway...', 'info');

        // Submit the form after a short delay
        setTimeout(() => {
            document.getElementById('esewa-payment-form').submit();
        }, 1000);

    } catch (error) {
        console.error('eSewa payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
    }
}

// Add eSewa signature generation function
function createEsewaSignature(config, transactionUuid) {
    const message = `total_amount=${config.total_amount},transaction_uuid=${transactionUuid},product_code=${config.product_code}`;
    const hash = CryptoJS.HmacSHA256(message, config.secret_key);
    return CryptoJS.enc.Base64.stringify(hash);
}

function validateCheckoutForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Basic phone validation (Nepali phone format)
    const phoneRegex = /^(\+977)?[9][6-9]\d{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        return false;
    }
    
    return true;
}



function processCashOnDelivery(total, transactionId, customerData) {
    // Show processing notification
    showNotification('Processing your order...', 'info');
    
    // Simulate order processing delay
    setTimeout(() => {
        showNotification('Order placed successfully! (Cash on Delivery)', 'success');
        
        // Clear the cart
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        
        // Close checkout modal
        closeCheckoutModal();
        
        // Show COD order confirmation
        showCODOrderConfirmation(total, customerData);
    }, 2000);
}

function showOrderConfirmation() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const confirmation = document.createElement('div');
    confirmation.className = 'order-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>🎉 Order Confirmed!</h3>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <p><strong>Order Total: Rs. ${total.toLocaleString()}</strong></p>
            <p>You will receive an email confirmation shortly.</p>
            <button onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 5000);
}

function showCODOrderConfirmation(total, customerData) {
    const confirmation = document.createElement('div');
    confirmation.className = 'order-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you for your order. Your order has been confirmed for Cash on Delivery.</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <h4>Order Details:</h4>
                <p><strong>Customer:</strong> ${customerData.firstName} ${customerData.lastName}</p>
                <p><strong>Delivery Address:</strong> ${customerData.address}</p>
                <p><strong>Phone:</strong> ${customerData.phone}</p>
                <p><strong>Order Total:</strong> Rs. ${total.toLocaleString()}</p>
                <p><strong>Payment Method:</strong> Cash on Delivery</p>
            </div>
            <p><strong>Important:</strong> Please have the exact amount ready when your order arrives.</p>
            <p>You will receive a confirmation call from our delivery team.</p>
            <button onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto remove after 8 seconds (longer for COD orders)
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 8000);
}

// User Management
function openUserModal() {
    userModal.classList.add('active');
    overlay.classList.add('active');
}

function closeUserModal() {
    userModal.classList.remove('active');
    overlay.classList.remove('active');
}

function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Show corresponding content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById(tabName + 'Tab').classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate login
    showNotification('Logging in...', 'info');
    
    setTimeout(() => {
        currentUser = { email, name: email.split('@')[0] };
        showNotification('Login successful!', 'success');
        closeUserModal();
        e.target.reset();
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Creating account...', 'info');
    
    setTimeout(() => {
        currentUser = { email, name };
        showNotification('Account created successfully!', 'success');
        closeUserModal();
        e.target.reset();
    }, 1000);
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Utility Functions
function closeAllModals() {
    searchModal.classList.remove('active');
    cartSidebar.classList.remove('active');
    checkoutModal.classList.remove('active');
    userModal.classList.remove('active');
    overlay.classList.remove('active');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'info':
            notification.style.background = '#3498db';
            break;
        default:
            notification.style.background = '#27ae60';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Add CSS for order confirmation and notifications
const additionalStyles = `
    .order-confirmation {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    }
    
    .confirmation-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 1rem;
    }
    
    .confirmation-content h3 {
        color: #27ae60;
        margin-bottom: 1rem;
    }
    
    .confirmation-content button {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        font-weight: 600;
    }
    
    .confirmation-content button:hover {
        background: #2980b9;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 