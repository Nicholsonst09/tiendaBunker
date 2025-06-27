const urlBase = '/api/v1/admin/productos';
const tabla = document.getElementById('tablaProductos');
const form = document.getElementById('formProducto');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById('productoId').value;
    const producto = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        imagen: document.getElementById('imagen').value
    };

    if (id) {
        await fetch (`${urlBase}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        })
    }else {
        await fetch(urlBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    }

    form.reset();    
    cargarProductos();
})

function cancelarEdicionDeProductos(){
    form.reset();
    document.getElementById('productoId').value = '';
}

async function cargarProductos(){
    const res = await fetch(urlBase);
    const productos = await res.json();

    tabla.innerHTML = "";
    productos.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${Number(p.precio).toFixed(2)}</td>
            <td><img src="${p.imagen}" alt="${p.nombre}" width="50"></td>
            <td>
                <button onclick="editarProducto(${p.id})">Editar</button>
                <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

async function editarProducto(id) {
    const res = await fetch(`${urlBase}/${id}`);
    const producto = await res.json();

    document.getElementById('productoId').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('imagen').value = producto.imagen;
}

async function eliminarProducto(id) {
    if (confirm('¿Eliminar este producto?')){
        await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
        cargarProductos();
    }
}

function logout(){
    window.location.href = "/logout";
}

cargarProductos()