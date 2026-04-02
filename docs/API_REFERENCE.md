# API Reference - Corporación de Ventas

## Tabla de Contenidos
- [API Externa: DummyJSON](#api-externa-dummyjson)
- [Endpoints Utilizados](#endpoints-utilizados)
- [Eventos del Carrito (Context API)](#eventos-del-carrito-context-api)
- [Eventos de Navegación](#eventos-de-navegación)
- [Eventos de UI](#eventos-de-ui)
- [Estructura de Datos](#estructura-de-datos)

---

## API Externa: DummyJSON

**Base URL:** `https://dummyjson.com`

API REST pública y gratuita que proporciona datos de productos para prototipado y desarrollo. No requiere autenticación.

---

## Endpoints Utilizados

### 1. Productos por Categoría

**Endpoint:** `GET /products/category/{category}`

**Usado en:**
- `Movil.jsx` → `/products/category/smartphones`
- `Laptop.jsx` → `/products/category/laptops`
- `Vehiculos.jsx` → `/products/category/vehicle`
- `Motos.jsx` → `/products/category/motorcycle`
- `Categorias.jsx` → `/products/category/{params.id}` (dinámico)

**Ejemplo de Request:**
```http
GET https://dummyjson.com/products/category/smartphones
```

**Ejemplo de Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg"
      ]
    }
  ],
  "total": 10,
  "skip": 0,
  "limit": 30
}
```

---

### 2. Lista de Categorías

**Endpoint:** `GET /products/category-list`

**Usado en:** `FiltroCategorias.jsx`

**Ejemplo de Request:**
```http
GET https://dummyjson.com/products/category-list
```

**Ejemplo de Response:**
```json
[
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "vehicle",
  "motorcycle",
  "sunglasses",
  "mens-shirts",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "mens-watches",
  "mens-shoes",
  "womens-shoes"
]
```

---

### 3. Búsqueda de Productos

**Endpoint:** `GET /products/search?q={query}`

**Usado en:** `Busquedas.jsx`

**Ejemplo de Request:**
```http
GET https://dummyjson.com/products/search?q=iphone
```

**Ejemplo de Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "price": 549,
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    }
  ],
  "total": 3,
  "skip": 0,
  "limit": 30
}
```

---

### 4. Detalle de Producto

**Endpoint:** `GET /products/{id}`

**Usado en:** `Detalle.jsx`

**Ejemplo de Request:**
```http
GET https://dummyjson.com/products/1
```

**Ejemplo de Response:**
```json
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
    "https://cdn.dummyjson.com/product-images/1/2.jpg",
    "https://cdn.dummyjson.com/product-images/1/3.jpg"
  ],
  "reviews": [
    {
      "rating": 5,
      "comment": "Great product!",
      "reviewerName": "John Doe",
      "date": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 5. Todos los Productos (Paginación)

**Endpoint:** `GET /products?limit=5&skip={offset}`

**Usado en:** `Tienda.jsx`

**Ejemplo de Request:**
```http
GET https://dummyjson.com/products?limit=5&skip=0
GET https://dummyjson.com/products?limit=5&skip=5
```

**Ejemplo de Response:**
```json
{
  "products": [ ... ],
  "total": 100,
  "skip": 0,
  "limit": 5
}
```

---

### 6. Crear Carrito (Checkout)

**Endpoint:** `POST /carts/add`

**Usado en:** `CarritoProvider.jsx` → función `comprar()`

**Ejemplo de Request:**
```http
POST https://dummyjson.com/carts/add
Content-Type: application/json

{
  "userId": 1,
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 5, "quantity": 1 }
  ]
}
```

**Ejemplo de Response:**
```json
{
  "id": 1,
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "price": 549,
      "quantity": 2,
      "total": 1098
    }
  ],
  "total": 1098,
  "discountedTotal": 977.22,
  "userId": 1
}
```

---

## Eventos del Carrito (Context API)

### Contexto: `CarritoContext`

**Definición:** `src/contexts/CarritoContext.jsx`
**Provider:** `src/contexts/CarritoProvider.jsx`

### Estado Expuesto

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `cart` | `Array<Product>` | Array de productos en el carrito |

### Estructura del Producto en Carrito

```typescript
interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  stock: number;
  cantidad: number;  // Propiedad agregada por la app
}
```

### Acciones

#### `agregar(producto, cantidad)`

Agrega o actualiza un producto con cantidad específica.

**Parámetros:**
- `producto` (object): Objeto producto de la API
- `cantidad` (number): Cantidad deseada

**Comportamiento:**
- Si `cantidad === 0`: Elimina el producto del carrito
- Si el producto ya existe: Actualiza la cantidad
- Si no existe: Agrega nuevo producto
- Valida que `cantidad <= producto.stock`

**Usado en:** `CardProductos.jsx`

---

#### `agregar2(producto)`

Incrementa la cantidad de un producto en 1.

**Parámetros:**
- `producto` (object): Objeto producto

**Comportamiento:**
- Si el producto ya existe: `cantidad + 1`
- Si no existe: Agrega con `cantidad: 1`

**Usado en:** `ModalProductos.jsx`, `VerCarrito.jsx`

---

#### `restar(producto)`

Decrementa la cantidad de un producto en 1.

**Parámetros:**
- `producto` (object): Objeto producto

**Comportamiento:**
- Si `cantidad === 1`: Elimina el producto del carrito
- Si `cantidad > 1`: `cantidad - 1`

**Usado en:** `VerCarrito.jsx`

---

#### `eliminar(producto)`

Elimina un producto del carrito con confirmación.

**Parámetros:**
- `producto` (object): Objeto producto

**Comportamiento:**
- Muestra `window.confirm()` para confirmar
- Si confirma: Elimina del carrito y muestra alerta

**Usado en:** `VerCarrito.jsx`

---

#### `vaciar()`

Vacía completamente el carrito.

**Comportamiento:**
- Muestra `window.confirm()` para confirmar
- Si confirma: `setCart([])`

**Usado en:** `VerCarrito.jsx`

---

#### `comprar()`

Procesa la compra y envía datos a DummyJSON.

**Comportamiento:**
- POST a `/carts/add` con los productos del carrito
- Muestra alerta de confirmación
- Vacía el carrito

**Usado en:** `VerCarrito.jsx`

---

## Eventos de Navegación

### Rutas Disponibles

| Ruta | Componente | Parámetros | Descripción |
|------|-----------|------------|-------------|
| `/` | Movil | - | Página por defecto (teléfonos) |
| `/movil` | Movil | - | Catálogo de teléfonos |
| `/laptops` | Laptop | - | Catálogo de laptops |
| `/vehiculos` | Vehiculos | - | Catálogo de vehículos |
| `/motos` | Motos | - | Catálogo de motos |
| `/tienda` | Tienda | - | Tienda general con paginación |
| `/detalle/:id/:nombre` | Detalle | `id`, `nombre` | Detalle de producto |
| `/categorias/:id` | Categorias | `id` (nombre de categoría) | Productos por categoría |
| `/busquedas` | Busquedas | `location.state` (query) | Resultados de búsqueda |
| `*` | Movil | - | Fallback (404) |

### Navegación Programática

```javascript
// Header.jsx - Búsqueda
navigate('/busquedas', { state: txtbuscar });

// Detalle.jsx - Volver atrás
navigate(-1);
```

### Links de Navegación

```javascript
// Header.jsx - Menú principal
<Link to="/movil">Celulares</Link>
<Link to="/vehiculos">Carros</Link>
<Link to="/motos">Motos</Link>
<Link to="/laptops">Laptops</Link>
<Link to="/tienda">Tienda</Link>

// FiltroCategorias.jsx - Categorías dinámicas
<Link to={`/categorias/${item}`}>{item}</Link>

// CardProductos.jsx - Detalle
<Link to={`/detalle/${item.id}/${item.title}`}>Detalles</Link>
```

---

## Eventos de UI

### Bootstrap Modals

| Modal ID | Trigger | Contenido |
|----------|---------|-----------|
| `#searchModal` | Botón search en Header | Formulario de búsqueda |
| `#carritoModal` | Botón carrito en Header | Componente VerCarrito |
| `{item.id}` | Botón "Modal" en CardProductos | ModalProductos con detalle |

### Eventos de Formulario

| Evento | Componente | Handler | Descripción |
|--------|-----------|---------|-------------|
| `onSubmit` | Header (search form) | `manejoEnvio` | Envía búsqueda y navega a /busquedas |
| `onChange` | Header (search input) | `menejoTxt` | Actualiza estado de búsqueda |
| `onChange` | CardProductos (select) | `handleChange` | Actualiza cantidad seleccionada |

### Eventos de Click

| Elemento | Componente | Handler | Acción |
|----------|-----------|---------|--------|
| Botón "Add" | CardProductos | `agregar(item, cant)` | Agrega/actualiza producto |
| Botón "Actualizar" | CardProductos | `agregar(item, cant)` | Actualiza cantidad |
| Botón "Añadir al carrito" | ModalProductos | `agregar2(item)` | Agrega +1 al carrito |
| Botón "-" | VerCarrito | `restar(item)` | Reduce cantidad |
| Botón "+" | VerCarrito | `agregar2(item)` | Incrementa cantidad |
| Botón eliminar | VerCarrito | `eliminar(item)` | Elimina del carrito |
| Botón "Vaciar Carrito" | VerCarrito | `vaciar()` | Vacía carrito |
| Botón "Proceder al Pago" | VerCarrito | `comprar()` | Procesa compra |
| Miniatura imagen | Detalle | `setCurrentImage(index)` | Cambia imagen principal |
| Botón "Volver" | Detalle | `navigate(-1)` | Navega atrás |

---

## Estructura de Datos

### Objeto Producto (desde DummyJSON)

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
}

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  date: string; // ISO 8601
}
```

### Estado de Página (Patrón Común)

```typescript
interface PageState {
  datos: Product[];
  loading: boolean;
  error: string | null;
}
```

### Estado de Tienda (con Paginación)

```typescript
interface TiendaState extends PageState {
  skip: number;
  totalProducts: 100;
  limit: 5;
}
```

### Formato de Moneda

**Función:** `formatCurrency(value)` en `src/util/funciones.js`

- **Locale:** `es-VE` (Venezuela)
- **Formato:** Separador de miles con punto, decimales con coma
- **Ejemplo:** `1234.56` → `1.234,56`
