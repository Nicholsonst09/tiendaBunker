export function renderizadoProductos(arregloProductos, contenedorHtml){
    let contenidoHTML = ''

    arregloProductos.forEach((producto)=>{
        //console.log(producto)
        contenidoHTML += `
        <a href="">
            <article class="contenedor__producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="informacion-productos">
                    <p>${producto.nombre}</p>
                    <p class="precio">$${producto.precio}</p>
                    <button class="boton__carro" data-btn-carro data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </article>
        </a>
        `
    })
    contenedorHtml.innerHTML = contenidoHTML;
}

export function renderizadoSucursales(arregloSucursales, contenedorHtml){
    let contenidoHTML = ''

    arregloSucursales.forEach((sucursal)=>{
        //console.log(sucursal)
         contenidoHTML += `
         <div class="contenedor__sucursal">
             <img src="${sucursal.imagen}" alt="${sucursal.nombre}" width="300" height="300">
             <h3>${sucursal.nombre}</h3>
             <!-- En realidad, el botón contacto de cada sucursal hace
             haría referencia a un número de whatsapp de cada sucursal. Por
             ahora lo ponemos como referencia a la página de contacto -->
             <a href="contacto.html">CONTACTO</a>
         </div>
         `
    })
    contenedorHtml.innerHTML = contenidoHTML;
}

export function renderizadoProductosCarro(carrito, contenedorCarrito){
    let contenidoHTML = '';
    let totalCarrito = 0;
    carrito.forEach((producto) => {

        const precioTotal = producto.precio * producto.cantidad;
        totalCarrito += precioTotal;
        contenidoHTML += `
            <article>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="120" height="120">
                <p>${producto.nombre}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Total: $${precioTotal} </p>
                <button class="eliminar-producto" data-id="${producto.id}">X</button>
        </article>
        `;
    })

    contenedorCarrito.innerHTML = contenidoHTML;

    const totalCompra = document.getElementById("total-compra");
    totalCompra.innerText = `Total: $${totalCarrito}`;
}

export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

export function actualizarCantidadCarrito() {
    const cantidadItems = document.getElementById("carro-cantidad-items");
    if (cantidadItems) { // Solo si el elemento existe en la página
        cantidadItems.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
}


export function agregarAlCarrito (productos, productoId) {
    const productoSeleccionado = productos.find(producto => producto.id === productoId); //buscar el producto seleccionado

    if (productoSeleccionado) {
        const productoEnCarrito = carrito.find(producto => producto.id === productoId);
        if(productoEnCarrito){
            productoEnCarrito.cantidad++;
        }else{                
            productoSeleccionado.cantidad = 1;//si no está en el carrito, se lo agrega con cantidad 1
            carrito.push(productoSeleccionado);
        }          
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCantidadCarrito();
    }
};


export function actualizarCarrito (contenedorCarrito)  {
    if (carrito.length > 0) {
        renderizadoProductosCarro(carrito, contenedorCarrito);
        //eliminarDelCarrito();
    } else {
        contenedorCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
}

export function eliminarDelCarrito (productoId, contenedorHtml) {
    carrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizadoProductosCarro(carrito, contenedorHtml);
    //actualizarCarrito(contenedorCarrito);
}

export function mensajeDePedido (){
    if (carrito.length === 0){
        alert("El carrito se encuentra vacío. Agrega productos antes de intentar pagar");
        return; //sin esto, después de mostrar el mensaje redirige al ws
    }

    const formaEntrega = document.querySelector('input[name="retirar"]:checked');
    if (!formaEntrega){
        alert("Por favor, seleccione una opción de entrega (Envío o Retiro)");
        return;
    }

    let mensaje = "Hola, me gustaría hacer un pedido:\n\n"
    let totalCarrito = 0;

    carrito.forEach((producto) => {
        const precioTotal = producto.precio * producto.cantidad;
        mensaje += `- ${producto.nombre} (Cantidad: ${producto.cantidad} - $${precioTotal})\n`
        totalCarrito += precioTotal;
    });

    mensaje += `\nTotal : $${totalCarrito}`;

    const metodoEntrega = formaEntrega.value === "envío" ? "Envío a domicilio" : "Retiro en la tienda";
    mensaje += `\n\nMétodo de entrega: ${metodoEntrega}`;

    console.log(formaEntrega);

    const numeroWs = "5493704063801";    
    const ws = `https://api.whatsapp.com/send?phone=${numeroWs}&text=${encodeURIComponent(mensaje)}`;

    window.location.href = ws;
}

actualizarCantidadCarrito();