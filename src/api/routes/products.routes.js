import express from "express";
import { obtenerProductos, obtenerProductoPorId } from "../controllers/product.controller.js";

const router = express.Router();

// Obtener TODOS los productos (para el frontend)
router.get("/", obtenerProductos);

// Obtener un producto por ID
router.get("/:id", obtenerProductoPorId);

export default router;
