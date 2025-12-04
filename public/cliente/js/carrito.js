function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("cart-container");
    const totalElement = document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <img src="/uploads/${item.image}" class="cart-img">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Precio: $${item.price}</p>

                <div class="qty">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">Eliminar</button>
            </div>
        `;

        container.appendChild(row);
    });

    totalElement.textContent = total;
}

window.changeQty = (id, amount) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
};

window.removeItem = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
};

document.getElementById("finalizar").addEventListener("click", () => {
    if (confirm("¿Confirmar compra?")) {
        localStorage.removeItem("cart");
        window.location.href = "ticket.html";
    }
});

loadCart();
