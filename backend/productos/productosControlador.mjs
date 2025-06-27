import * as modelo from "./productosModelo.mjs";

export async function obtenerTodosLosProductos(req, res) {
    try{
        const productos = await modelo.obtenerTodosLosProductos();
        res.status(200).json(productos);
    }catch(error){
        console.error('Error al obtener productos:',error.message);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
}

export async function obtenerProductoPorId(req, res){
    try{
        const id = req.params.id;
        const producto = await modelo.obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({error: "Producto no encontrado"});
        }
        res.status(200).json(producto);
    }catch(error){
        console.error('Error al obtene producto:',error.message);
        res.status(500).json({error: 'Error al obtener el producto'});
    }
}

export async function crearProducto(req, res){
    try{
        const nuevo = modelo.crearProducto(req.body);
        res.status(200).json(nuevo)
    }catch{
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

export async function actualizarProducto(req, res){
    try{
        const id = req.params.id;
        const actualizado = await modelo.actualizarProducto(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: "Producto no encontrado"});
        }
        res.status(200).json(actualizado);
    }catch{
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

export async function eliminarProducto(req, res) {
    try {
        const id = req.params.id;
        const eliminado = await modelo.eliminarProducto(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado', eliminado });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}
