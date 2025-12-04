function loadCart() {
    // MISMA CLAVE QUE EN productos.js
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");
    const totalElement = document.getElementById("total");

    console.log("Carrito cargado:", cart); // para ver en consola que llega

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price) * Number(item.quantity);

        container.innerHTML += `
            <div class="cart-item">
                <img src="/uploads/${item.image}" class="cart-img" />
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Precio: $${item.price}</p>
                    <p>Categoría: ${item.category}</p>

                    <div class="qty">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeItem(${index})">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    totalElement.innerText = total.toFixed(2);
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.onload = loadCart;