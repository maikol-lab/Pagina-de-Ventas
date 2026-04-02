# Funcionalidades - Corporación de Ventas

## Tabla de Contenidos
- [Resumen General](#resumen-general)
- [Catálogo de Productos](#catálogo-de-productos)
- [Carrito de Compras](#carrito-de-compras)
- [Búsqueda de Productos](#búsqueda-de-productos)
- [Filtrado por Categorías](#filtrado-por-categorías)
- [Detalle de Producto](#detalle-de-producto)
- [Paginación](#paginación)
- [Persistencia de Datos](#persistencia-de-datos)
- [Animaciones](#animaciones)
- [Diseño Responsivo](#diseño-responsivo)

---

## Resumen General

Corporación de Ventas es una tienda en línea completa que permite:

- Explorar productos de múltiples categorías
- Buscar productos por nombre
- Filtrar por categorías dinámicas
- Ver detalles completos de cada producto
- Agregar productos al carrito con control de cantidad
- Gestionar el carrito (agregar, quitar, vaciar)
- Simular el proceso de compra
- Navegación fluida sin recarga de página

---

## Catálogo de Productos

### Páginas de Catálogo

La aplicación cuenta con 5 páginas de catálogo especializadas:

| Página | Ruta | Categoría API | Productos |
|--------|------|---------------|-----------|
| Teléfonos | `/movil` | `smartphones` | Teléfonos móviles |
| Laptops | `/laptops` | `laptops` | Computadoras portátiles |
| Vehículos | `/vehiculos` | `vehicle` | Automóviles |
| Motos | `/motos` | `motorcycle` | Motocicletas |
| Tienda | `/tienda` | Todos (paginado) | Todos los productos |

### Tarjeta de Producto (CardProductos)

Cada producto se muestra con:

- **Imagen:** Thumbnail del producto
- **Título:** Nombre del producto
- **Marca:** Fabricante
- **Stock:** Unidades disponibles
- **Precio:** Formateado en moneda local (es-VE)
- **Badge de cantidad:** Indicador si ya está en el carrito
- **Selector de cantidad:** Dropdown para elegir cantidad (1 a min(stock, 10))
- **Botón "Modal":** Abre vista rápida del producto
- **Botón "Detalles":** Navega a la página de detalle
- **Botón "Add/Actualizar":** Agrega o actualiza en el carrito

### Estados de Carga

Todas las páginas de catálogo manejan 3 estados:

1. **Loading:** Spinner animado con mensaje "Cargando Datos..."
2. **Error:** Mensaje de error con descripción técnica
3. **Datos:** Grid de productos renderizados

---

## Carrito de Compras

### Acceso al Carrito

- Botón en el Header con badge contador de productos
- Abre un modal fullscreen con la vista completa del carrito

### Funcionalidades del Carrito

| Acción | Descripción | Componente |
|--------|-------------|------------|
| **Ver carrito** | Tabla con todos los productos agregados | VerCarrito |
| **Incrementar (+)** | Aumenta cantidad de un producto en 1 | VerCarrito |
| **Decrementar (-)** | Reduce cantidad; elimina si llega a 0 | VerCarrito |
| **Eliminar** | Elimina producto con confirmación | VerCarrito |
| **Vaciar carrito** | Elimina todos los productos con confirmación | VerCarrito |
| **Proceder al pago** | Envía datos a API y vacía carrito | VerCarrito |

### Resumen del Pedido

Panel lateral derecho que muestra:

- **Subtotal:** Suma total de todos los productos
- **Envío:** Gratuito
- **Total:** Monto final a pagar
- **Métodos de pago:** Iconos de Visa, Mastercard, PayPal, Stripe

### Código de Descuento

Campo de entrada para cupones de descuento (placeholder para futura implementación).

---

## Búsqueda de Productos

### Cómo Buscar

1. Click en el botón de lupa (search) en el Header
2. Se abre un modal fullscreen con campo de búsqueda
3. Escribir el nombre del producto
4. Presionar Enter o click en el botón de búsqueda
5. Navega automáticamente a la página de resultados

### Página de Resultados

- Muestra la cantidad total de productos encontrados
- Muestra el término de búsqueda como título
- Resultados en grid con las mismas tarjetas de producto
- Animación de entrada: `animate__fadeInLeftBig`

---

## Filtrado por Categorías

### Categorías Dinámicas

- El dropdown "Categorias" en el Header carga dinámicamente todas las categorías disponibles desde la API
- Cada categoría es un link que navega a `/categorias/{nombre}`
- La página Categorias.jsx renderiza los productos de esa categoría específica

### Categorías Disponibles (ejemplos)

- smartphones
- laptops
- fragrances
- skincare
- groceries
- home-decoration
- vehicle
- motorcycle
- sunglasses
- mens-shirts / mens-watches / mens-shoes
- womens-bags / womens-dresses / womens-jewellery / womens-shoes

---

## Detalle de Producto

### Acceso

- Click en botón "Detalles" en cualquier tarjeta de producto
- URL: `/detalle/:id/:nombre`

### Contenido de la Página

**Galería de Imágenes:**
- Imagen principal grande
- Miniaturas clickeables debajo (si hay múltiples imágenes)
- Indicador visual de imagen seleccionada (borde azul)

**Información del Producto:**
- Título
- Rating con estrellas y número de reseñas
- Precio
- Estado de disponibilidad (Disponible/Agotado)
- Descripción completa
- Categoría
- Marca
- Stock disponible
- Porcentaje de descuento

**Acciones:**
- Botón "Añadir al carrito"
- Botón de favoritos (placeholder)
- Botón "Volver" (navega atrás)

**Reseñas de Clientes:**
- Lista de reseñas con:
  - Nombre del reviewer
  - Rating con estrellas
  - Fecha formateada
  - Comentario
- Botón "Escribir reseña" (placeholder)

---

## Paginación

### Implementación en Tienda.jsx

- **Productos por página:** 5
- **Total de productos:** 100
- **Total de páginas:** 20

### Controles

- **Botón "Anterior":** Navega a la página anterior (deshabilitado en página 1)
- **Botón "Siguiente":** Navega a la página siguiente (deshabilitado en última página)
- **Indicador:** "Página X de Y"

### Mecanismo

- Usa el parámetro `skip` de la API DummyJSON
- `skip = 0` → Página 1 (productos 1-5)
- `skip = 5` → Página 2 (productos 6-10)
- `skip = 10` → Página 3 (productos 11-15)

---

## Persistencia de Datos

### Carrito en LocalStorage

**Key:** `"cart"`

**Comportamiento:**
1. **Al cargar:** Lee el carrito desde localStorage y lo restaura
2. **Al modificar:** Guarda automáticamente el carrito actualizado
3. **Al cerrar el navegador:** El carrito se mantiene intacto

**Estructura guardada:**
```json
[
  {
    "id": 1,
    "title": "iPhone 9",
    "price": 549,
    "thumbnail": "...",
    "brand": "Apple",
    "category": "smartphones",
    "stock": 94,
    "cantidad": 2
  }
]
```

---

## Animaciones

### WOW.js + Animate.css

**Inicialización:** `App.jsx` con `useEffect`

```javascript
const wow = new WOW({
  live: true // Detecta elementos dinámicos
});
wow.init();
```

### Elementos Animados

| Elemento | Clase WOW | Delay | Efecto |
|----------|-----------|-------|--------|
| Footer | `wow fadeIn` | 0.2s | Aparece con fade |
| Headers de página | `wow fadeInUp` | 0.2s | Aparece desde abajo |
| Resultados búsqueda | `animate__fadeInLeftBig` | - | Aparece desde izquierda |

---

## Diseño Responsivo

### Breakpoints

La aplicación utiliza el sistema de grid de Bootstrap 5:

| Breakpoint | Ancho | Dispositivo |
|------------|-------|-------------|
| xs | < 576px | Móvil |
| sm | ≥ 576px | Móvil grande |
| md | ≥ 768px | Tablet |
| lg | ≥ 992px | Desktop |
| xl | ≥ 1200px | Desktop grande |

### Grid de Productos

```
row-cols-1    → 1 columna (móvil)
row-cols-sm-2 → 2 columnas (tablet pequeño)
row-cols-md-3 → 3 columnas (tablet)
row-cols-lg-4 → 4 columnas (desktop)
```

### Topbar

- **Desktop (`d-lg-block`):** Visible con info de alumno, fecha/hora, login, redes sociales
- **Móvil (`d-none`):** Oculto para ahorrar espacio

### Header

- **Desktop:** Navegación horizontal completa
- **Móvil:** Menú hamburguesa colapsable

### Footer

- **Desktop:** 4 columnas (info, links, contacto, galería)
- **Móvil:** Columnas apiladas verticalmente

---

## Funcionalidades por Componente

### Header
- [x] Logo y branding
- [x] Fecha/hora en tiempo real
- [x] Links de navegación por categoría
- [x] Dropdown de categorías dinámicas
- [x] Barra de búsqueda con modal
- [x] Botón de carrito con contador
- [x] Links a redes sociales
- [x] Login/Register (placeholder)

### CardProductos
- [x] Imagen del producto
- [x] Información básica (título, marca, stock, precio)
- [x] Badge de cantidad en carrito
- [x] Modal de vista rápida
- [x] Link a detalle
- [x] Selector de cantidad
- [x] Botón agregar/actualizar

### VerCarrito
- [x] Tabla de productos
- [x] Controles +/- de cantidad
- [x] Eliminar producto individual
- [x] Vaciar carrito completo
- [x] Resumen del pedido
- [x] Código de descuento (UI)
- [x] Métodos de pago (UI)
- [x] Proceder al pago

### Detalle
- [x] Galería de imágenes interactiva
- [x] Información completa del producto
- [x] Rating y reseñas
- [x] Botón volver
- [x] Añadir al carrito (placeholder)

### Footer
- [x] Suscripción por email (UI)
- [x] Links a redes sociales
- [x] Información de contacto
- [x] Galería de trabajos recientes
- [x] Quick links
