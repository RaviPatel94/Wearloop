// Fetch items.json data
tp=document.getElementById("totalprice")
async function loadCartItems() {
    try {
        // Fetch the items.json file
        const response = await fetch('./items.json');
        const items = await response.json();

        // Retrieve the cart items from localStorage
        const kartlist = JSON.parse(localStorage.getItem('kart')) || [];

        // Select the div where cart items will be displayed
        const cartItemsDiv = document.getElementById('cartItems');

        if (kartlist.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }
        let totalPrice = 0;

        kartlist.forEach(cartItemId => {
            // Find the matching item in the items.json based on the id
            const item = items.find(i => i.id == cartItemId);

            // If item found, create HTML for the item and display it
            if (item) {
                const cartItemHTML = `
                    <div class="cart-item">
                        <img class="cart-item-thumbnail" src="${item.img}" alt="${item.title}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">${item.price}</div>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsDiv.insertAdjacentHTML('beforeend', cartItemHTML);
                totalPrice += parseFloat(item.price);
                tp.innerHTML=""

            }
        });
    } catch (error) {
        console.error('Error loading cart items:', error);
    }
}

// Function to remove item from cart
function removeFromCart(itemId) {
    let kartlist = JSON.parse(localStorage.getItem('kart')) || [];

    // Remove the item from the kartlist
    kartlist = kartlist.filter(id => id != itemId);

    // Update localStorage
    localStorage.setItem('kart', JSON.stringify(kartlist));

    // Reload the page to reflect the changes
    location.reload();
}

// Load cart items on page load
window.onload = loadCartItems;
