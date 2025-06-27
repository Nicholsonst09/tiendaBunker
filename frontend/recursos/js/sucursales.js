import { renderizadoSucursales, actualizarCantidadCarrito } from "./funciones.js";


/* Renderizado de sucursales */
const contenedorSucursales = document.getElementById('contenedor-sucursales');

const respuesta = await fetch("./recursos/js/sucursales.json");
const datos = await respuesta.json();

renderizadoSucursales(datos.sucursales, contenedorSucursales); 
actualizarCantidadCarrito();