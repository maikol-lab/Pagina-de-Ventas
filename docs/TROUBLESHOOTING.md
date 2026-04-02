# Troubleshooting - Corporación de Ventas

## Tabla de Contenidos
- [Problemas Comunes](#problemas-comunes)
- [Errores de API](#errores-de-api)
- [Errores de Carrito](#errores-de-carrito)
- [Errores de Navegación](#errores-de-navegación)
- [Problemas de Build/Deploy](#problemas-de-builddeploy)
- [Problemas de Estilos](#problemas-de-estilos)
- [Problemas de Rendimiento](#problemas-de-rendimiento)
- [Debugging Tips](#debugging-tips)

---

## Problemas Comunes

### La aplicación no inicia

**Síntoma:** `npm run dev` falla o la página no carga.

**Soluciones:**

1. **Verificar dependencias instaladas:**
   ```bash
   npm install
   ```

2. **Limpiar caché de Vite:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Verificar versión de Node.js:**
   ```bash
   node --version
   ```
   Se requiere Node.js 18+ para Vite 7.

4. **Reinstalar dependencias:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### Página en blanco sin errores

**Síntoma:** La app carga pero muestra pantalla blanca.

**Causas probables:**

1. **Error silencioso en React:** Abrir DevTools (F12) → Console para ver errores.

2. **Ruta no encontrada:** Verificar que la URL coincida con las rutas definidas en `App.jsx`.

3. **API no responde:** Verificar conexión a internet. La app depende de DummyJSON.

---

## Errores de API

### "Failed to fetch" o "Network Error"

**Síntoma:** Mensaje "Error al cargar los datos" en las páginas.

**Causas:**

1. **Sin conexión a internet:** La app requiere internet para consumir DummyJSON.

2. **API caída:** Verificar [status.dummyjson.com](https://dummyjson.com/).

3. **CORS bloqueado:** Si se ejecuta en un entorno restringido.

**Soluciones:**

- Verificar conexión a internet
- Probar la API directamente en el navegador: `https://dummyjson.com/products`
- Si usas un proxy corporativo, configurar las excepciones necesarias

---

### Productos no se muestran

**Síntoma:** La página carga pero no muestra productos.

**Diagnóstico:**

1. Abrir DevTools → Network → Verificar requests a DummyJSON
2. Verificar el status code de la respuesta
3. Revisar la estructura de la respuesta en el tab Response

**Posibles causas:**

- La categoría no existe en la API
- El endpoint ha cambiado
- Rate limiting de la API

**Solución:**

Verificar el endpoint correcto en `API_REFERENCE.md`.

---

### Error 404 en producto específico

**Síntoma:** Al navegar a `/detalle/:id`, muestra error.

**Causa:** El ID del producto no existe en DummyJSON.

**Solución:** Los IDs válidos están entre 1 y 100 (aproximadamente).

---

## Errores de Carrito

### El carrito no persiste al recargar

**Síntoma:** Al refrescar la página, el carrito está vacío.

**Causas:**

1. **localStorage deshabilitado:** Algunos navegadores en modo incógnito bloquean localStorage.

2. **Espacio insuficiente:** localStorage tiene un límite de ~5MB.

**Soluciones:**

- Verificar que el navegador permite localStorage
- Limpiar datos del sitio si está corrupto: DevTools → Application → Local Storage → Clear

---

### "La cantidad no puede ser mayor al STOCK"

**Síntoma:** Alerta al intentar agregar muchos productos.

**Comportamiento esperado:** La app valida que la cantidad solicitada no exceda el stock disponible del producto.

**Solución:** Seleccionar una cantidad menor o igual al stock disponible.

---

### El carrito muestra cantidades incorrectas

**Síntoma:** Los productos tienen cantidades que no coinciden con lo agregado.

**Causa:** Posible corrupción del estado en localStorage.

**Solución:**

1. Vaciar el carrito desde la UI
2. O manualmente: DevTools → Application → Local Storage → Eliminar key "cart"
3. Recargar la página

---

### Error al procesar compra

**Síntoma:** Click en "Proceder al Pago" no funciona o muestra error.

**Causas:**

1. **Error de red en POST:** Verificar conexión
2. **Carrito vacío:** No se puede comprar sin productos

**Nota:** El endpoint `POST /carts/add` de DummyJSON es solo simulación. No procesa pagos reales.

---

## Errores de Navegación

### Click en categoría no navega

**Síntoma:** Click en una categoría del dropdown no lleva a la página.

**Causas:**

1. **Categoría con caracteres especiales:** Algunas categorías pueden tener espacios o caracteres que necesitan encoding.

2. **React Router no montado:** Verificar que `BrowserRouter` envuelve toda la app en `App.jsx`.

**Solución:** Verificar la URL generada y que coincida con la ruta `/categorias/:id`.

---

### Botón "Volver" no funciona

**Síntoma:** Click en "Volver" en Detalle.jsx no regresa.

**Causa:** `navigate(-1)` requiere que haya historial de navegación previo.

**Solución:** Si se accede directamente a `/detalle/:id`, no hay historial. Usar `navigate('/')` como fallback.

---

### Ruta no encontrada (404 en producción)

**Síntoma:** Al acceder directamente a `/movil` o `/tienda` en producción, da 404.

**Causa:** SPA routing requiere configuración del servidor para redirigir todas las rutas a `index.html`.

**Solución para GitHub Pages:**

El archivo `vite.config.js` debe incluir:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nombre-del-repo/',
});
```

---

## Problemas de Build/Deploy

### Error en `npm run build`

**Síntoma:** El build falla con errores de ESLint o SWC.

**Soluciones:**

1. **Errores de ESLint:**
   ```bash
   npm run build -- --no-lint
   ```

2. **Verificar imports:** Todos los imports deben ser correctos y los archivos deben existir.

3. **Variables no usadas:** ESLint puede fallar por variables declaradas pero no usadas.

---

### Error de deployment en GitHub Pages

**Síntoma:** La app se despliega pero no carga correctamente.

**Soluciones:**

1. **Configurar base path:**
   ```javascript
   // vite.config.js
   export default defineConfig({
     base: '/Corporacion-de-Ventas/',
   });
   ```

2. **Verificar que gh-pages está instalado:**
   ```bash
   npm install gh-pages --save-dev
   ```

3. **Deploy manual:**
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

---

### Imágenes rotas en producción

**Síntoma:** Las imágenes no se muestran después del deploy.

**Causa:** Rutas relativas incorrectas.

**Solución:** Las imágenes en `public/img/` deben referenciarse como `img/nombre.jpg` (sin `/` inicial).

---

## Problemas de Estilos

### Bootstrap no carga

**Síntoma:** La app se ve sin estilos.

**Causas:**

1. **CSS no importado:** Verificar que `bootstrap.min.css` está en `public/css/` y se referencia correctamente en `index.html`.

2. **Orden de carga:** El CSS custom debe cargar después de Bootstrap.

**Solución:** Verificar `index.html`:

```html
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
```

---

### Iconos no se muestran

**Síntoma:** Los iconos de FontAwesome/Bootstrap Icons aparecen como cuadrados.

**Causas:**

1. **FontAwesome no cargado:** Verificar que el CDN o los archivos de FontAwesome están incluidos en `index.html`.

2. **Bootstrap Icons:** La app usa clases `bi-*` que requieren Bootstrap Icons.

**Solución:** Agregar en `index.html`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
```

---

### Animaciones no funcionan

**Síntoma:** Los elementos no se animan al hacer scroll.

**Causas:**

1. **WOW.js no inicializado:** Verificar `useEffect` en `App.jsx`.

2. **Clases faltantes:** Los elementos deben tener clase `wow` + animación.

**Solución:**

```javascript
useEffect(() => {
  const wow = new WOW({ live: true });
  wow.init();
}, []);
```

---

### Modal no se abre

**Síntoma:** Click en botón de modal no abre nada.

**Causas:**

1. **Bootstrap JS no cargado:** Los modals de Bootstrap requieren el JS de Bootstrap.

2. **IDs no coinciden:** El `data-bs-target` debe coincidir con el `id` del modal.

**Solución:** Verificar que Bootstrap JS está incluido en `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

---

## Problemas de Rendimiento

### La app es lenta al cargar

**Causas:**

1. **Imágenes grandes:** Las imágenes en `public/img/` no están optimizadas.

2. **Muchos productos:** Cargar 100 productos de una vez puede ser lento.

**Soluciones:**

- Optimizar imágenes (comprimir, usar WebP)
- Implementar lazy loading para imágenes
- Usar paginación en todas las páginas (actualmente solo Tienda.jsx la tiene)

---

### Re-renders excesivos

**Síntoma:** La app se siente lenta al interactuar.

**Causas:**

1. **Context re-render:** Cambios en `CarritoContext` re-renderizan todos los consumidores.

2. **Sin memoización:** Componentes se re-renderizan sin necesidad.

**Soluciones:**

- Usar `React.memo()` en componentes puros
- Separar el contexto en sub-contextos si crece
- Usar `useMemo` y `useCallback` donde sea necesario

---

### localStorage lento con muchos items

**Síntoma:** El carrito tarda en cargar al iniciar.

**Causa:** localStorage es síncrono y bloquea el thread principal.

**Solución:** Para carritos grandes, considerar IndexedDB o un backend.

---

## Debugging Tips

### Herramientas Recomendadas

1. **React DevTools:**
   - Inspeccionar el árbol de componentes
   - Ver props y estado en tiempo real
   - Profiler para identificar re-renders

2. **Redux DevTools (para Context):**
   - Se puede usar para inspeccionar el Context API

3. **Network Tab:**
   - Verificar requests a DummyJSON
   - Analizar tiempos de respuesta
   - Verificar payloads de POST

4. **Console:**
   - Los errores de la API se loguean en `console.error`
   - Agregar `console.log` temporales para debug

### Logging Temporal

Para debug, agregar logs en los handlers:

```javascript
// En CarritoProvider.jsx
const agregar = (producto, cant) => {
  console.log('Agregar producto:', producto, 'Cantidad:', cant);
  console.log('Carrito actual:', cart);
  // ... resto del código
};
```

### Verificar Estado del Carrito

Desde la consola del navegador:

```javascript
// Ver carrito actual en localStorage
JSON.parse(localStorage.getItem('cart'));
```

### Verificar Rutas Activas

Desde la consola del navegador:

```javascript
// Ver ruta actual
window.location.pathname;
```

---

## Errores Conocidos

### 1. ModalProductos usa `bootstrap` no importado

**Archivo:** `ModalProductos.jsx:117`

```javascript
const modal = bootstrap.Modal.getInstance(document.getElementById(item.id));
```

**Problema:** `bootstrap` no está importado como módulo.

**Solución:** Agregar import o usar el global `window.bootstrap`:

```javascript
const modal = window.bootstrap?.Modal.getInstance(document.getElementById(item.id));
```

---

### 2. VerCarrito tiene `formatCurrency` duplicado

**Archivo:** `VerCarrito.jsx:4-12`

La función `formatCurrency` está definida localmente en VerCarrito pero también existe en `src/util/funciones.js`.

**Solución:** Importar desde utilidades:

```javascript
import { formatCurrency } from '../util/funciones';
```

---

### 3. Detalle.jsx botón "Añadir al carrito" no funcional

**Archivo:** `Detalle.jsx:151`

El botón no tiene handler `onClick`.

**Solución:** Conectar con el contexto del carrito:

```javascript
import { useContext } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';

const { agregar2 } = useContext(CarritoContext);

// En el botón:
onClick={() => agregar2(producto)}
```
