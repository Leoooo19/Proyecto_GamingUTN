const API_URL = "http://localhost:3500/api";

export async function getProducts(page = 1, limit = 8) {
    const response = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
}