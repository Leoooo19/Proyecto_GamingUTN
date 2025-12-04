

console.log("CARRITO RECIBIDO:", JSON.parse(localStorage.getItem("cart")));
// Obtener datos del carrito
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Obtener nombre del cliente
const client = localStorage.getItem("clientName") || "Invitado";

document.getElementById("ticket-client").textContent = client;

// Fecha y hora actual
const now = new Date();
const formattedDate =
    now.toLocaleDateString() + " " + now.toLocaleTimeString();

document.getElementById("ticket-date").textContent = formattedDate;

// Mostrar ítems del ticket
const ticketItems = document.getElementById("ticket-items");
const ticketTotal = document.getElementById("ticket-total");

let totalFinal = 0;

cart.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("ticket-item");

    div.innerHTML = `
        <span>${product.name} x${product.quantity}</span>
        <span>$${(product.price * product.quantity).toLocaleString()}</span>
    `;

    ticketItems.appendChild(div);

    totalFinal += Number(product.price) * Number(product.quantity);

});

ticketTotal.textContent = totalFinal.toLocaleString();

// Botón volver al inicio
document.getElementById("volver-btn").addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

// DESCARGAR TICKET COMO PDF
document.getElementById("download-btn").addEventListener("click", () => {
    const originalTitle = document.title;
    document.title = `Ticket_GamingUTN_${client}_${now.getTime()}`;

    window.print();

    document.title = originalTitle;
});

