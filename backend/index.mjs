import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'node:path'
import { fileURLToPath } from 'node:url';

import productos from "./productos/productosPublicos.rutas.mjs"
import productosCRUD from "./productos/productosCRUD.rutas.mjs"

//Configuracion de rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Inicializar express y variables
dotenv.config()
const app = express();
const PUERTO = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Servir de manera estática el front de administración 
app.use(express.static('CRUD'));

// Servir archivos estáticos desde /frontend
app.use(express.static(path.join(__dirname, '../frontend')));

//Rutas CRUD para admin
app.use('/api/v1/admin/productos', productosCRUD)

//Rutas API Públicas
app.use('/api/v1/productos', productos)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en puerto ${PUERTO}`);
})