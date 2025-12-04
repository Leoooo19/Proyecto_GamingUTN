import db from "../database/db.js";

class ProductoModel {

    // TRAER TODOS LOS PRODUCTOS
    static async obtenerTodos() {
        const query = "SELECT * FROM products";
        const [rows] = await db.query(query);
        return rows;
    }

    // TRAER UN PRODUCTO POR ID
    static async obtenerPorId(id) {
        const query = "SELECT * FROM products WHERE id = ?";
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    // CREAR PRODUCTO
    static async crear(nombre, imagen, categoria, precio) {
        const query = `
            INSERT INTO products (nombre, imagen, categoria, precio, activo, creado_en, actualizado_en)
            VALUES (?, ?, ?, ?, 1, NOW(), NOW())
        `;
        await db.query(query, [nombre, imagen, categoria, precio]);
    }

    // EDITAR PRODUCTO
    static async editar(nombre, imagen, categoria, precio, id) {
        const query = `
            UPDATE products
            SET nombre = ?, imagen = ?, categoria = ?, precio = ?, actualizado_en = NOW()
            WHERE id = ?
        `;
        await db.query(query, [nombre, imagen, categoria, precio, id]);
    }

    // DESACTIVAR (BAJA LÓGICA)
    static async desactivar(id) {
        const query = `
            UPDATE products
            SET activo = 0
            WHERE id = ?
        `;
        await db.query(query, [id]);
    }

    // ACTIVAR
    static async activar(id) {
        const query = `
            UPDATE products
            SET activo = 1
            WHERE id = ?
        `;
        await db.query(query, [id]);
    }
}

export default ProductoModel;
