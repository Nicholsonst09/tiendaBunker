import pool from "../db/conexion.mjs"

export async function obtenerTodosLosProductos() {
    const consulta = 'SELECT * FROM productos';
    const resultado = await pool.query(consulta);
    return resultado.rows;
}

export async function obtenerProductoPorId(id){
    const consulta = 'SELECT * FROM productos WHERE id = $1';
    const resultado = await pool.query(consulta, [id]);
    return resultado.rows[0];
}

export async function crearProducto(producto){
    const query = `
        INSERT INTO productos (nombre, categoria, precio, imagen)
        VALUES ($1, $2, $3, $4)
        RETURNING * 
    `;
    const values = [producto.nombre, producto.categoria, producto.precio, producto.imagen]
    const resultado = await pool.query(query, values);
    return resultado.rows[0];
}

export async function actualizarProducto(id, producto) {
    const query = `
        UPDATE productos
        SET nombre = $1, categoria = $2, precio = $3, imagen = $4
        WHERE id = $5
        RETURNING *;
    `;
    const values = [producto.nombre, producto.categoria, producto.precio, producto.imagen, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function eliminarProducto(id) {
    const query = `DELETE FROM productos WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // devuelve el eliminado, o null
}