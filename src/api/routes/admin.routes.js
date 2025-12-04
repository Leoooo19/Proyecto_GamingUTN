import express from "express";
import multer from "multer";
import ProductoModel from "../models/product.models.js";

const router = express.Router();

/* ======================================
    Configuración de MULTER para imágenes
====================================== */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/images"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});

const upload = multer({ storage });

/* ======================================
    DASHBOARD - LISTAR PRODUCTOS
====================================== */
router.get("/productos", async (req, res) => {
    try {
        const productos = await ProductoModel.obtenerTodos();

        res.render("admin/layout", {
            title: "Listado de Productos",
            view: "products",
            productos
        });

    } catch (error) {
        console.log(error);
        res.send("Error al obtener productos");
    }
});

/* ======================================
    CREAR PRODUCTO - VISTA
====================================== */
router.get("/productos/crear", (req, res) => {
    res.render("admin/layout", {
        title: "Crear Producto",
        view: "create"
    });
});

/* ======================================
    CREAR PRODUCTO - PROCESAR FORMULARIO
====================================== */
router.post("/productos/crear", upload.single("imagen"), async (req, res) => {
    try {
        const { nombre, categoria, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;

        await ProductoModel.crear(nombre, imagen, categoria, precio);

        res.redirect("/admin/productos");

    } catch (error) {
        console.log(error);
        res.send("Error al crear producto");
    }
});

/* ======================================
    EDITAR PRODUCTO - VISTA
====================================== */
router.get("/productos/editar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await ProductoModel.obtenerPorId(id);

        res.render("admin/layout", {
            title: "Editar Producto",
            view: "edit",
            producto
        });

    } catch (error) {
        console.log(error);
        res.send("Error al cargar producto");
    }
});

/* ======================================
    EDITAR PRODUCTO - PROCESAR FORMULARIO
====================================== */
router.post("/productos/editar/:id", upload.single("imagen"), async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, categoria, precio, imagenActual } = req.body;

        // Si el usuario subió nueva imagen, usarla. Si no, mantener la actual.
        const imagen = req.file ? req.file.filename : imagenActual;

        await ProductoModel.editar(nombre, imagen, categoria, precio, id);

        res.redirect("/admin/productos");

    } catch (error) {
        console.log(error);
        res.send("Error al editar producto");
    }
});

/* ======================================
    BAJA LÓGICA DEL PRODUCTO (DESACTIVAR)
====================================== */
router.post("/productos/desactivar/:id", async (req, res) => {
    try {
        await ProductoModel.desactivar(req.params.id);
        res.redirect("/admin/productos");
    } catch (error) {
        console.log(error);
        res.send("Error al desactivar producto");
    }
});

/* ======================================
    ACTIVAR PRODUCTO
====================================== */
router.post("/productos/activar/:id", async (req, res) => {
    try {
        await ProductoModel.activar(req.params.id);
        res.redirect("/admin/productos");
    } catch (error) {
        console.log(error);
        res.send("Error al activar producto");
    }
});

export default router;
