# Corporación de Ventas

> Tienda en línea SPA construida con React 19, Vite 7 y Bootstrap 5, que consume la API DummyJSON para mostrar productos con carrito de compras, búsqueda, filtrado por categorías y paginación.

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge&logo=react-router)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-2.x-41E0FD?style=for-the-badge&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)
![SWC](https://img.shields.io/badge/SWC-3.x-F8C457?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=for-the-badge&logo=eslint)
![Animate.css](https://img.shields.io/badge/Animate.css-4.x-E43E52?style=for-the-badge)
![WOW.js](https://img.shields.io/badge/WOW.js-1.x-FF6600?style=for-the-badge)
![React Icons](https://img.shields.io/badge/React_Icons-5.x-F7DF1E?style=for-the-badge&logo=react)
![Popper.js](https://img.shields.io/badge/Popper.js-2.x-FA5917?style=for-the-badge)
![DummyJSON](https://img.shields.io/badge/API-DummyJSON-0078D4?style=for-the-badge&logo=api)
![gh-pages](https://img.shields.io/badge/Deploy-gh--pages-333333?style=for-the-badge&logo=github-pages)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Características del Proyecto](./docs/FEATURES.md)
- [Documentación Adicional](#documentación-adicional)
- [Licencia](#licencia)


---

## Demo

[Ver Demo en Vivo](#) *(agregar URL cuando se despliegue)*

---

## Características Principales

- **Catálogo multi-categoría:** Teléfonos, laptops, vehículos, motos y tienda general
- **Carrito de compras completo:** Agregar, quitar, actualizar cantidades, vaciar
- **Persistencia local:** El carrito se guarda en localStorage
- **Búsqueda en tiempo real:** Buscar productos por nombre
- **Filtrado dinámico:** Categorías cargadas desde la API
- **Detalle de producto:** Galería de imágenes, reseñas, especificaciones
- **Paginación:** Navegación por páginas en la tienda general
- **Animaciones:** WOW.js + Animate.css para transiciones suaves
- **Diseño responsivo:** Adaptable a móvil, tablet y desktop
- **SPA:** Navegación sin recarga de página con React Router v7

---

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.1.0 | Framework UI |
| Vite | 7.0.4 | Bundler y dev server |
| React Router DOM | 7.6.3 | Routing client-side |
| Bootstrap | 5.3.7 | Framework CSS |
| React Bootstrap | 2.10.10 | Componentes React |
| React Icons | 5.5.0 | Iconografía |
| WOW.js | 1.2.2 | Animaciones al scroll |
| Animate.css | 4.1.1 | Librería de animaciones |
| ESLint | 9.30.1 | Linting |
| gh-pages | 6.3.0 | Deploy a GitHub Pages |

---

## Requisitos Previos

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (o yarn/pnpm)
- **Git** (para clonar el repositorio)
- **Conexión a internet** (para consumir la API DummyJSON)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd "Corporacion de Ventas"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## Uso

### Navegación Principal

| Sección | Descripción |
|---------|-------------|
| **Celulares** | Catálogo de teléfonos móviles |
| **Carros** | Catálogo de vehículos |
| **Motos** | Catálogo de motocicletas |
| **Laptops** | Catálogo de computadoras portátiles |
| **Tienda** | Todos los productos con paginación |
| **Categorías** | Filtrado dinámico por categoría |

### Carrito de Compras

1. Click en el botón del carrito (icono de carrito en Header)
2. Ver todos los productos agregados
3. Modificar cantidades con los botones +/- 
4. Eliminar productos individuales
5. Vaciar carrito completo
6. Proceder al pago (simulación)

### Búsqueda

1. Click en el icono de lupa en el Header
2. Escribir el nombre del producto
3. Presionar Enter o click en buscar
4. Ver resultados en la página de búsqueda

---

## Estructura del Proyecto

```
Corporacion de Ventas/
├── docs/                          # Documentación completa
│   ├── ARCHITECTURE.md            # Arquitectura y diagramas
│   ├── API_REFERENCE.md           # Referencia de APIs y eventos
│   ├── FEATURES.md                # Guía de funcionalidades
│   └── TROUBLESHOOTING.md         # Resolución de problemas
├── public/                        # Assets estáticos
│   ├── css/                       # Estilos (Bootstrap + custom)
│   └── img/                       # Imágenes del tema
├── src/
│   ├── components/                # Componentes reutilizables
│   │   ├── CardProductos.jsx      # Tarjeta de producto
│   │   ├── FiltroCategorias.jsx   # Dropdown de categorías
│   │   ├── Footer.jsx             # Pie de página
│   │   ├── Header.jsx             # Cabecera y navegación
│   │   ├── ModalProductos.jsx     # Modal de vista rápida
│   │   ├── PostFooter.jsx         # Footer secundario
│   │   └── VerCarrito.jsx         # Vista del carrito
│   ├── contexts/                  # Context API
│   │   ├── CarritoContext.jsx     # Definición del contexto
│   │   └── CarritoProvider.jsx    # Provider del carrito
│   ├── pages/                     # Páginas/rutas
│   │   ├── Busquedas.jsx          # Resultados de búsqueda
│   │   ├── Categorias.jsx         # Categoría dinámica
│   │   ├── Detalle.jsx            # Detalle de producto
│   │   ├── Laptop.jsx             # Catálogo laptops
│   │   ├── Movil.jsx              # Catálogo teléfonos
│   │   ├── Motos.jsx              # Catálogo motos
│   │   ├── Tienda.jsx             # Tienda con paginación
│   │   └── Vehiculos.jsx          # Catálogo vehículos
│   ├── util/
│   │   └── funciones.js           # Utilidades (formatCurrency)
│   ├── App.jsx                    # Componente raíz
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Estilos globales
├── index.html                     # HTML principal
├── package.json                   # Dependencias
├── vite.config.js                 # Config de Vite
└── eslint.config.js               # Config de ESLint
```

---

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Movil | Página por defecto |
| `/movil` | Movil | Teléfonos móviles |
| `/laptops` | Laptop | Laptops |
| `/vehiculos` | Vehiculos | Vehículos |
| `/motos` | Motos | Motos |
| `/tienda` | Tienda | Tienda general (paginada) |
| `/detalle/:id/:nombre` | Detalle | Detalle de producto |
| `/categorias/:id` | Categorias | Productos por categoría |
| `/busquedas` | Busquedas | Resultados de búsqueda |

---

## API Externa

La aplicación consume [DummyJSON](https://dummyjson.com/), una API REST pública y gratuita para prototipado.

### Endpoints utilizados

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/products/category/{cat}` | GET | Productos por categoría |
| `/products/category-list` | GET | Lista de categorías |
| `/products/search?q={q}` | GET | Búsqueda de productos |
| `/products/{id}` | GET | Detalle de producto |
| `/products?limit=5&skip={n}` | GET | Paginación |
| `/carts/add` | POST | Simular compra |

Para más detalles, ver [docs/API_REFERENCE.md](docs/API_REFERENCE.md).

---

## Documentación Adicional

| Documento | Descripción |
|-----------|-------------|
| [Arquitectura](docs/ARCHITECTURE.md) | Diagramas de arquitectura, componentes, flujo de datos y patrones de diseño |
| [API Reference](docs/API_REFERENCE.md) | Referencia completa de endpoints, eventos del carrito, navegación y estructura de datos |
| [Features](docs/FEATURES.md) | Guía detallada de todas las funcionalidades de la aplicación |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Resolución de problemas comunes, errores conocidos y debugging tips |

---

## Scripts Disponibles

```bash
# Servidor de desarrollo con HMR
npm run dev

# Build de producción
npm run build

# Preview del build de producción
npm run preview

# Linting del código
npm run lint
```

---

## Deploy

### GitHub Pages

1. Instalar dependencia:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Configurar `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/nombre-del-repo/',
   });
   ```

3. Deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

### Build Local

```bash
npm run build
# Los archivos estáticos estarán en dist/
# Servir con cualquier servidor estático
```

---

## Troubleshooting

Para problemas comunes y soluciones, ver [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

### Problemas rápidos:

| Problema | Solución rápida |
|----------|----------------|
| App no inicia | `npm install` |
| Página en blanco | Revisar consola del navegador (F12) |
| Imágenes rotas | Verificar rutas en `public/img/` |
| API no responde | Verificar conexión a internet |
| Carrito no persiste | Verificar localStorage habilitado |

---

## Licencia

Proyecto educativo. Template original diseñado por [HTML Codex](https://htmlcodex.com) y distribuido por [ThemeWagon](https://themewagon.com/).

---

## Autor

**maikol** - [maikolrodriguez2020.2016@gmail.com](mailto:maikolrodriguez2020.2016@gmail.com)
