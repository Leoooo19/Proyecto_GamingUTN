import { Router } from "express";
import {
    getActiveProductsPaginated,
    getProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getActiveProductsPaginated);
router.get("/:id", getProductById);

export default router;