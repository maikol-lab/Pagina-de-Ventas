# Arquitectura del Proyecto - Corporación de Ventas

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

## Visión General

Corporación de Ventas es una aplicación SPA (Single Page Application) de e-commerce construida con React 19 y Vite 7. La aplicación consume la API externa [DummyJSON](https://dummyjson.com/) para mostrar productos de diversas categorías (teléfonos, laptops, vehículos, motos) con funcionalidades completas de carrito de compras, búsqueda, filtrado por categorías y paginación.

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | React | ^19.1.0 |
| Bundler | Vite | ^7.0.4 |
| Router | React Router DOM | ^7.6.3 |
| UI Framework | Bootstrap | ^5.3.7 |
| UI Components | React Bootstrap | ^2.10.10 |
| Icons | React Icons | ^5.5.0 |
| Animations | WOW.js + Animate.css | ^1.2.2 / ^4.1.1 |
| Linter | ESLint | ^9.30.1 |
| Deployment | GitHub Pages (gh-pages) | ^6.3.0 |

---

## Estructura del Proyecto

![Diagrama de Estructura del Proyecto](../src/assets/Diagrama%20de%20la%20Estructura%20del%20Proyecto.png)

---

## Diagrama de Arquitectura
![Diagrama de Diagrama de Arquitectura](../src/assets/Diagrama%20de%20Arquitectura.png)

---

## Diagrama de Componentes

![ Diagrama de Componentes](../src/assets/Diagrama%20de%20Componentes.png)

---

## Flujo de Datos

### 1. Carga de Productos (Pattern: Fetch on Mount)

![ Diagrama de Carga de Productos](../src/assets/Carga%20de%20Productos.png)

### 2. Gestión del Carrito (Context API)

![ Diagrama de Gestión del Carrito](../src/assets/Gestión%20del%20Carrito.png)

### 3. Búsqueda de Productos

![ Diagrama de Búsqueda de Productos](../src/assets/Búsqueda%20de%20Productos.png)

### 4. Compra (Checkout)

![ Diagrama de Compra (Checkout)](../src/assets/Compra%20(Checkout).png)

---

## Patrones de Diseño

### 1. Context API + Provider Pattern
- **CarritoContext**: Define el contexto compartido
- **CarritoProvider**: Provee estado y acciones a toda la aplicación
- **useContext(CarritoContext)**: Consumido por Header, CardProductos, ModalProductos, VerCarrito

### 2. Container/Presentational Pattern
- **Pages (Containers)**: Manejan fetching, loading, error states
- **Components (Presentational)**: Reciben datos vía props, renderizan UI

### 3. Custom Data Fetching Pattern
Todas las páginas siguen el mismo patrón:
```javascript
const [datos, setDatos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => { getDatos(); }, []);

// Conditional rendering: loading → error → datos
```

### 4. LocalStorage Persistence
- El carrito se persiste en `localStorage` bajo la key `"cart"`
- Se carga al inicializar el provider (`getInitialCart`)
- Se guarda automáticamente en cada cambio (`useEffect` on `cart`)

### 5. SPA Routing con React Router v7
- Client-side routing sin recarga de página
- Rutas dinámicas: `/detalle/:id/:nombre`, `/categorias/:id`
- Fallback route: `*` → Movil
- Navegación programática: `useNavigate()`
- Paso de datos entre rutas: `location.state`

---

## Decisiones de Arquitectura

| Decisión | Racional |
|----------|----------|
| Context API sobre Redux | Proyecto de escala media, sin necesidad de middleware complejo |
| localStorage para carrito | Persistencia simple sin backend propio |
| DummyJSON como API | API gratuita para prototipado, sin autenticación |
| Bootstrap + CSS custom | Tema pre-diseñado con personalización mínima |
| Vite sobre CRA | Mejor performance de build y HMR |
| Componentes por tipo | Separación clara: components, pages, contexts, util |
