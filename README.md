# Proyecto Tienda Full Stack
Este proyecto es una tienda web de venta de bebidas que permite visualizar productos, filtrarlos por categoría y gestionar el 
inventario mediante un panel administrativo (CRUD).

## 🧩 Requisitos

- Docker y Docker Desktop
- Node.js >= 18

## Iniciar base de datos con Docker

```bash
docker run --name tienda-postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=tienda \
  -p 5432:5432 \
  -d postgres

-- Esto es para iniciarla, pero asegurarse tenerla corriendo en Docker cada vez que se esté corriendo el servidor y se desee consumirla. 

## CREAR TABLA PRODUCTOS 
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  imagen TEXT,
  categoria TEXT
);


## Acceder a la base de datos desde la terminal:  
docker exec -it tienda-postgres psql -U admin -d tienda
De ahí nos debería devolver 'tienda=#' y ya está listo para hacerle consulta o algún comando SQL

## Backend (instalación y ejecución). Posicionados en la carptea raíz del proyecto, ejecutamos:
· cd backend
· npm install
· npm run dev 
-- Esto levanta el servidor http://localhost:3000

# Frontend
· Tienda: http://localhost:3000/index.html 
· CRUD: http://localhost:3000/admin.html

##Cargar productos de prueba 
1. Con el servidor corriendo, acceder a http://localhost:3000/admin.html
2. Completar los campos del formulario de productos con la siguiente información:
3. Las imágenes ya están incluidas dentro del proyecto, no es necesario subirlas

Productos sugeridos:
Nombre	                   Categoría	    Precio	  Imagen (URL tal cual)
Aconcagua blanco	          Gin	          1100.00	  ./recursos/imagenes/bebidas/GIN-ACONCAGUA-BLANCO.jpg
Gin Aconcagua verde	        Gin	          1200.00	  ./recursos/imagenes/bebidas/GIN-ACONCAGUA-VERDE.jpg
Gin Aconcagua rosa	        Gin	          1300.00	  ./recursos/imagenes/bebidas/GIN-ACONCAGUA-PINK.jpg
Gin Aconcagua azul	        Gin	          1400.00	  ./recursos/imagenes/bebidas/GIN-ACONCAGUA-AZUL.jpg
Stella Artois x 473cc	      Cervezas	    900.00	  ./recursos/imagenes/bebidas/CERVEZA-STELLA-ARTOIS-X-473CC.jpg
Whisky Jack Daniels x 750	  Whisky	      5000.00	  ./recursos/imagenes/bebidas/WHISKY-JACK-DANIELS-X-750.jpg

Luego de cargados verlos en http://localhost:3000/catalogo.html 

## API REST
· GET /api/v1/productos → Lista todos los productos (público)
· GET /api/v1/productos/:id → Trae un producto por ID
· GET /api/v1/admin/productos → Lista productos (uso administrativo)
· POST /api/v1/admin/productos → Crea un producto
·PUT /api/v1/admin/productos/:id → Actualiza un producto
· DELETE /api/v1/admin/productos/:id → Elimina un producto

# COMO FUNCIONA
· El backend está hehco con Express
· La base de datos es PostgreSQL, y se conecta usando Docker
· El frontend está hecho en HTML/CSS/JS
· Los productos se cargan dinámicamente mediante fetch() a la API 
· Las imágenes deben estar en la carpeta recursos/imagenes/bebidas

# CRUD - Panel administrativo(admin.html)
· Permite agregar, editar y eliminar productos
· Los campos requeridos son: nombre, categoría, precio e imagen.
· Al guardar, los datos se almacenan en PostgreSQL a través de la API  /api/v1/admin/productos.

#Endpoints útiles
· Ver todos los productos: http://localhost:3000/api/v1/productos
· Ver producto por ID: http://localhost:3000/api/v1/productos/1 
· Ver API administrativa http://localhost:3000/api/v1/admin/productos 

