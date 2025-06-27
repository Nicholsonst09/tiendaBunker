import express from 'express';
import * as controlador from "./productosControlador.mjs";

const router = express.Router();

router.get('/', controlador.obtenerTodosLosProductos);
router.get('/:id', controlador.obtenerProductoPorId);

export default router;
