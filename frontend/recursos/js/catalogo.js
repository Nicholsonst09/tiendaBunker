import { renderizadoProductos} from "./funciones.js";
import { agregarAlCarrito, actualizarCantidadCarrito } from "./funciones.js";

const contenedorProductos = document.getElementById('contenedor-productos');
let productos = []

try{
    const respuesta = await fetch("/api/v1/productos");
    productos = await respuesta.json();

    renderizadoProductos(productos, contenedorProductos);

    const botonesProductos = document.querySelectorAll('[data-btn-carro]'); 
    botonesProductos.forEach((boton) => {
        boton.addEventListener("click",() => {
        const productoId = parseInt(boton.dataset.id);
        agregarAlCarrito(productos, productoId);
        });
    });
    actualizarCantidadCarrito();
}catch(error){
    console.error("Error al cargar productos desde la API:", error);
}
