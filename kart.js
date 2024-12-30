tp=document.getElementById("totalprice")
async function loadCartItems() {
    try {
        const response = await fetch('./items.json');
        const items = await response.json();

        const kartlist = JSON.parse(localStorage.getItem('kart')) || [];

        const cartItemsDiv = document.getElementById('cartItems');

        if (kartlist.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }
        let totalPrice = 0;

        kartlist.forEach(cartItemId => {
            const item = items.find(i => i.id == cartItemId);
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

function removeFromCart(itemId) {
    let kartlist = JSON.parse(localStorage.getItem('kart')) || [];
    kartlist = kartlist.filter(id => id != itemId);
    localStorage.setItem('kart', JSON.stringify(kartlist));
    location.reload();
}

window.onload = loadCartItems;
