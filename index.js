import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";

// Rutas API
import productRoutes from "./src/api/routes/products.routes.js";

// Rutas Admin
import adminRoutes from "./src/api/routes/admin.routes.js";

const app = express();
const PORT = environments.port;

// ============================
// Middlewares
// ============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Archivos estáticos (frontend + imágenes)
// ============================
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
// ============================
// Motor de vistas (admin panel - EJS)
// ============================
app.set("view engine", "ejs");
app.set("views", "./src/views");

// ============================
// Rutas del Admin Panel
// ============================
app.use("/admin", adminRoutes);

// ============================
// Rutas API (SPA Cliente/Backend)
// ============================
app.use("/api/products", productRoutes);

// ============================
// Ruta principal → Página de Inicio (index.html del cliente)
// ============================
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/cliente/index.html");
});

// ============================
// Iniciar servidor
// ============================
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
