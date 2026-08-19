// Select product buttons and cart display elements
const addButtons = document.querySelectorAll(".add-btn");

const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItems = document.getElementById("cart-items");

// Track running cart state
let count = 0;
let total = 0;

addButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        // Find the product card for this button click
        const product = event.target.parentElement;

        // Extract the product name and price text
        const productName = product.querySelector("h2");
        const price = product.querySelector("p");

        const name = productName.textContent;
        const priceValue = Number(price.textContent.replace("₹", ""));

        // Update cart totals and item count
        count++;
        total += priceValue;

        cartCount.textContent = count;
        cartTotal.textContent = total;

        // Add a new item line to the cart details section
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.textContent = `${name} - ₹${priceValue}`;
        cartItems.appendChild(cartItem);
    });
});
