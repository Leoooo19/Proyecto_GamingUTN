import { getProducts } from "./api.js";

let currentCategory = "ALL";
let allProducts = [];

const productsContainer = document.getElementById("products-container");
const categoryButtons = document.querySelectorAll(".category-btn");

// ========= CARGAR PRODUCTOS ==========
async function loadProducts() {
    try {
        const response = await getProducts(); // ahora devuelve SOLO un array
        allProducts = response;               // guardamos el array de productos
        renderProducts(allProducts);
    } catch (error) {
        console.log("Error al cargar productos:", error);
    }
}

function renderProducts(list) {
    productsContainer.innerHTML = "";

    const filtered = currentCategory === "ALL"
        ? list
        : list.filter(p => p.category === currentCategory);

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="/uploads/${product.image}" class="product-img" />
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="btn-add" onclick="addToCart(${product.id})">Agregar</button>
        `;

        productsContainer.appendChild(card);
    });
}

// ========= FILTRO POR CATEGORIA ==========
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        renderProducts(allProducts);
    });
});

// ========= CARRITO ==========
window.addToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        const product = allProducts.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto agregado al carrito");
};

// ========= INICIO ==========
loadProducts();
