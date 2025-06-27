import express from 'express';
import * as controlador from "./productosControlador.mjs";

const router = express.Router();

router.get("/", controlador.obtenerTodosLosProductos);
router.get("/:id", controlador.obtenerProductoPorId);
router.post("/", controlador.crearProducto);
router.put("/:id", controlador.actualizarProducto);
router.delete("/:id", controlador.eliminarProducto);

export default router;