import ProductoModel from "../models/product.models.js";

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.obtenerTodos();

        const respuesta = productos.map(p => ({
            id: p.id,
            name: p.nombre,
            category: p.categoria,
            price: p.precio,
            image: p.imagen,
            active: p.activo
        }));

        res.json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const p = await ProductoModel.obtenerPorId(req.params.id);

        const producto = {
            id: p.id,
            name: p.nombre,
            category: p.categoria,
            price: p.precio,
            image: p.imagen,
            active: p.activo
        };

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
};
