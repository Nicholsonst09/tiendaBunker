import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'node:path'
import { fileURLToPath } from 'node:url';

import rutasAuth from './auth/auth.rutas.mjs';
import {verificarToken, verificarTokenHTML } from './auth/auth.middleware.mjs';

import productos from "./productos/productosPublicos.rutas.mjs"
import productosCRUD from "./productos/productosCRUD.rutas.mjs"

//Ruta absoluta del backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Inicializar express y variables
dotenv.config()
const app = express();
const PUERTO = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//===== RUTAS =====

//Rutas de autenticación
app.use('/', rutasAuth);


//Ruta principal de admin (login)
app.use('/admin', express.static(path.join(__dirname, 'login')));

//Ruta de registro
app.use('/admin/registrar', express.static(path.join(__dirname, 'login/alta.html')));

//Panel de administración
app.use('/admin/dashboard', verificarTokenHTML, express.static(path.join(__dirname, '../frontend/CRUD'))); 

//FRONTEND (público) Tienda 
app.use(express.static(path.join(__dirname, '../frontend')));

//API (protegido)
app.use('/api/v1/admin/productos', verificarToken, productosCRUD);

//Rutas API Públicas
app.use('/api/v1/productos', productos)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en puerto ${PUERTO}`);
    console.log('Rutas disponibles:');
    console.log('Login: http://localhost:3000/admin/');
    console.log('Registro: http://localhost:3000/admin/registrar');
    console.log('Panel administrativo: http://localhost:3000/admin/dashboard/admin.html');
    console.log('Tienda: http://localhost:3000/');
})