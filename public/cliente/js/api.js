const API_URL = "http://localhost:3500/api/products";

// Obtener todos los productos
export async function getProducts() {
    const response = await fetch(API_URL);
    return response.json();  // devuelve un array simple
}

// Obtener producto por ID
export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}
