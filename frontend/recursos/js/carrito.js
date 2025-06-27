import { actualizarCarrito, eliminarDelCarrito, actualizarCantidadCarrito, mensajeDePedido } from "./funciones.js";

const contenedorCarrito = document.getElementById("contenedor-carro");

function eliminar () {
    const botonesEliminar = document.querySelectorAll(".eliminar-producto");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const productoId = parseInt(boton.dataset.id);        
            eliminarDelCarrito(productoId, contenedorCarrito);
            actualizarCarrito(contenedorCarrito);
            actualizarCantidadCarrito();
            eliminar(); 
        })
    })
}

actualizarCarrito(contenedorCarrito);
actualizarCantidadCarrito();
eliminar();

const botonPagar = document.getElementById('boton-pagar');
botonPagar.addEventListener('click', () => {
    mensajeDePedido();
});
