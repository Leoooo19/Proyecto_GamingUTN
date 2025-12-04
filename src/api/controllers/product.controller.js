import ProductModel from "../models/product.models.js";

export const getActiveProductsPaginated = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    const [[countRow]] = await ProductModel.countActiveProducts();
    const total = countRow.total;

    const [rows] = await ProductModel.selectActiveProductsPaginated(limit, offset);

    return res.status(200).json({
        payload: rows,
        pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        },
        message:
        rows.length === 0
            ? "No hay productos disponibles."
            : "Productos obtenidos correctamente.",
    });

    } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getProductById = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await ProductModel.selectProductById(id);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
    }

    return res.status(200).json({
        payload: rows[0],
        message: "Producto obtenido correctamente.",
    });

    } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
    }
};