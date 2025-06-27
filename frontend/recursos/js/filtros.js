import { renderizadoProductos} from "./funciones.js";

let productos = [];
try {
    const respuesta = await fetch("/api/v1/productos");
    productos = await respuesta.json();
} catch (error) {
    console.error("Error al cargar productos desde la API:", error);
}


let filtroCategoria = document.getElementById("filtro-categoria");
let precioMin = document.getElementById("preciomin");
let precioMax = document.getElementById("preciomax");
let botonFiltrar = document.getElementById("boton-Filtrar")
let botonLimpiar = document.getElementById("boton-Limpiar")
let contenedorProductos = document.getElementById('contenedor-productos');

function filtrarProductos () {
    let categoriaSeleccionada = filtroCategoria.value.toLowerCase();
    let min = parseFloat(precioMin.value) || 0;
    let max = parseFloat(precioMax.value) || Number.MAX_VALUE;

    let productosFiltrados = productos.filter(producto => {
        let cumpleCategoria = categoriaSeleccionada === "todos" || producto.categoria.toLowerCase() === categoriaSeleccionada;
        let cumplePrecio = producto.precio >= min && producto.precio <= max;
        return cumpleCategoria && cumplePrecio; 
    });
    renderizadoProductos(productosFiltrados,contenedorProductos);
};

function limpiarFiltros () {
    filtroCategoria.value = "todos";
    precioMin.value = "";
    precioMax.value = "";
    renderizadoProductos(productos,contenedorProductos);
};

botonFiltrar.addEventListener("click", (e) => {
    e.preventDefault(); //Para no recargar la página cuando se apriete el botón
    filtrarProductos();
});

botonLimpiar.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(productos);
    limpiarFiltros();
});