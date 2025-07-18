import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import PostFooter from './components/PostFooter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Movil from './pages/Movil'
import Laptop from './pages/Laptop'
import Tienda from './pages/Tienda'
import Vehiculos from './pages/Vehiculos'
import Motos from './pages/Motos'
import Detalle from './pages/Detalle'
import Categorias from './pages/Categorias'
import Busquedas from './pages/Busquedas'
import CarritoProvider from './contexts/CarritoProvider';

// para las animaciones
import 'animate.css';
import WOW from 'wow.js';


const App = () => {
  // inicializar WOW.js para las animaciones
  useEffect(() => {
    const wow = new WOW({
      live: true // detecta elementos dinámicos
    });
    wow.init();
  }, []);
  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Movil />} />
            <Route path="/movil" element={<Movil />} />
            <Route path="/laptops" element={<Laptop />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/motos" element={<Motos />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/detalle/:id/:nombre" element={<Detalle />} />
            <Route path="/categorias/:id" element={<Categorias />} />
            <Route path="/busquedas" element={<Busquedas />} />
            <Route path="*" element={<Movil />} />
          </Routes>
          <Footer />
          <PostFooter />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App