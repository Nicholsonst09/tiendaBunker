import pool from '../db/conexion.mjs';

export async function buscarUsuario(usuario){
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1', [usuario]
    )
    return resultado.rows[0];
}

export async function crearUsuario(usuario,passwordHash){
    const resultado = await pool.query(
        'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
        [usuario, passwordHash]
    );
    return resultado.rowCount > 0;
}