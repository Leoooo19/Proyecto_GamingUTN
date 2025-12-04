import connection from "../database/db.js";

// Seleccionar todos
export const selectAllProducts = () => {
    const sql = "SELECT * FROM products";
    return connection.query(sql);
};

// Seleccionar por id
const selectProductWhereId = (id) => {
    let sql = "SELECT * FROM products WHERE id = ?";
    return connection.query(sql, [id]);
};

// Crear producto
const insertProduct = (name, image, category, price) => {
    let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [name, image, category, price]);
};

// Actualizar producto
const updateProduct = (name, image, category, price, id) => {
    let sql = `
        UPDATE products
        SET name = ?, image = ?, category = ?, price = ?
        WHERE id = ?
    `;
    return connection.query(sql, [name, image, category, price, id]);
};

// Eliminar producto
const deleteProduct = (id) => {
    let sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
};

export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct
};
