window.onload = () => {
    const container = document.getElementById("ticket-container");
    const totalElement = document.getElementById("total");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p>No hay productos en el ticket.</p>";
        totalElement.innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += Number(item.price) * Number(item.quantity);

        container.innerHTML += `
            <div class="ticket-item">
                <p><strong>${item.name}</strong></p>
                <p>Cantidad: ${item.quantity}</p>
                <p>Precio unitario: $${item.price}</p>
                <hr>
            </div>
        `;
    });

    totalElement.innerText = total.toFixed(2);

    // Vaciar carrito
    localStorage.removeItem("cart");
};