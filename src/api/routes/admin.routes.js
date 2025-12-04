import express from "express";
import multer from "multer";
import ProductModels from "../models/product.models.js";

const router = express.Router();

// ============================
// MULTER (debe ir ANTES de las rutas)
// ============================

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ============================
// LISTAR PRODUCTOS
// ============================
router.get("/products", async (req, res) => {
    const products = await ProductModels.selectAllProducts();

    res.render("admin/layout", {
        title: "Administrar Productos",
        view: "products",
        products
    });
});


// ============================
// FORMULARIO CREAR PRODUCTO
// ============================
router.get("/products/create", (req, res) => {
    res.render("admin/create", {
        title: "Crear Producto"
    });
});

// ============================
// GUARDAR PRODUCTO (POST)
// ============================
router.post("/products/create", upload.single("image"), async (req, res) => {
    try {
        const { name, category, price } = req.body;
        const image = req.file.filename;

        await ProductModels.insertProduct(name, image, category, price);

        res.redirect("/admin/products");
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).send("Error al crear el producto");
    }
});

// ============================
// ELIMINAR PRODUCTO
// ============================
router.get("/products/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModels.deleteProduct(id);

        res.redirect("/admin/products");

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send("Error al eliminar el producto");
    }
});


router.get("/products/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [[product]] = await ProductModels.selectProductWhereId(id);

        res.render("admin/edit", {
            title: "Editar Producto",
            product
        });

    } catch (error) {
        console.error("Error al cargar el producto:", error);
        res.status(500).send("Error al cargar el producto");
    }
});

router.post("/products/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;

        // Si se sube imagen nueva → usarla
        let image = req.body.currentImage;

        if (req.file) {
            image = req.file.filename;
        }

        await ProductModels.updateProduct(name, image, category, price, id);

        res.redirect("/admin/products");

    } catch (error) {
        console.error("Error al editar producto:", error);
        res.status(500).send("Error al editar el producto");
    }
});




export default router;
