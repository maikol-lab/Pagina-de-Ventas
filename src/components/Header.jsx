import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import FiltroCategorias from './FiltroCategorias';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";


import { useContext } from "react"
import { CarritoContext } from "../contexts/CarritoContext"
import VerCarrito from './VerCarrito';
const Header = () => {
    // para el estado del menu activo
    const location = useLocation();

    // para el estado de la busqueda
    const [txtbuscar, setTxtbuscar] = useState('');
    const menejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };
    const navigate = useNavigate();
    const manejoEnvio = (event) => {
        event.preventDefault();
        navigate('/busquedas', {
            state: txtbuscar,
        });
        setTxtbuscar('');
    };

    // para el carrito
    const { cart, agregar2, restar, eliminar, vaciar, comprar } = useContext(CarritoContext)

    const getLocalDateTime = () => {
        const date = new Date();

        // Opciones para formatear la fecha y hora
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Usa formato 24 horas
        };

        return new Intl.DateTimeFormat('es-ES', options).format(date);
    };
    return (
        <div className="container-fluid header-top">
            <div className="nav-shaps-2" />
            <div className="container d-flex align-items-center">
                <div className="d-flex align-items-center h-100">
                    <a href="https://dummyjson.com/" className="navbar-brand" style={{ height: 125 }} target='_blank'>
                        <h1 className="text-warning mb-0 "><i className="fas fa-plug me-2" /> Corporación Articulos</h1>
                        {/* <img src="img/logo.png" alt="Logo"> */}
                    </a>
                </div>
                <div className="w-100 h-100">
                    <div className="topbar px-0 py-2 d-none d-lg-block" style={{ height: 45 }}>
                        <div className="row gx-0 align-items-center">
                            <div className="col-lg-8 text-center text-lg-center mb-lg-0">
                                <div className="d-flex flex-wrap">
                                    <div className="pe-4">
                                        <a href="#" className="text-muted small"><i className="fas fa-comment-dots text-primary me-2" />Nombre del Alumno</a>
                                    </div>
                                    <div className="pe-0">
                                        <a href="#" className="text-muted small"><i className="fa fa-clock text-primary me-2" /> {getLocalDateTime()}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center text-lg-end">
                                <div className="d-flex justify-content-end">
                                    <div className="d-flex align-items-center small">
                                        <a href="#" className="login-btn text-body me-3 pe-3"> <span>Login</span></a>
                                        <a href="#" className="text-body me-3"> Register</a>
                                    </div>
                                    <div className="d-flex pe-3">
                                        <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-facebook-f" /></a>
                                        <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-twitter" /></a>
                                        <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-instagram" /></a>
                                        <a className="btn p-0 text-primary me-0" href="#"><i className="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-bar px-0 py-lg-0" style={{ height: 80 }}>
                        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-lg-end">
                            <a href="#" className="navbar-brand-2">
                                <h1 className="text-primary mb-0"><i className="fas fa-hand-rock me-2" /> DummyJson</h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav mx-0 mx-lg-auto">
                                    <Link to="/movil" className={`nav-item nav-link ${location.pathname === '/movil' ? 'active' : ''}`} >Celulares</Link>
                                    <Link to="/vehiculos" className={`nav-item nav-link ${location.pathname === '/vehiculos' ? 'active' : ''}`} >Carros</Link>
                                    <Link to="/motos" className={`nav-item nav-link ${location.pathname === '/motos' ? 'active' : ''}`} >Motos</Link>
                                    <Link to="/laptops" className={`nav-item nav-link ${location.pathname === '/laptops' ? 'active' : ''}`}>Laptops</Link>
                                    <Link to="/tienda" className={`nav-item nav-link ${location.pathname === '/tienda' ? 'active' : ''}`}>Tienda</Link>

                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link" data-bs-toggle="dropdown">
                                            <span className="dropdown-toggle">Categorias</span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <FiltroCategorias />
                                        </div>
                                    </div>

                                    <div className="nav-btn ps-3">
                                        <button className="btn-search btn btn-primary btn-md-square mt-2 mt-lg-0 mb-4 mb-lg-0 flex-shrink-0" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search" /></button>
                                        <a href="#" className="btn btn-primary py-2 px-4 ms-0 ms-lg-3" data-bs-toggle="modal" data-bs-target="#carritoModal">
                                            <span>
                                                <i className="fa fa-shopping-cart me-3"></i>
                                                {cart.length > 0 && (
                                                    <span className="badge rounded-pill bg-warning text-dark">
                                                        {cart.length}
                                                    </span>
                                                )}
                                            </span>
                                        </a>
                                    </div>
                                    <div className="nav-shaps-1" />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>





            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Buscar un Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center bg-primary">
                            <form onSubmit={manejoEnvio} className="w-100">
                                <div className="input-group w-75 mx-auto d-flex">
                                    <input value={txtbuscar} onChange={menejoTxt} type="search" className="form-control p-3" placeholder="Indique el nombre del producto" aria-describedby="search-icon-1" />
                                    <button type="submit" data-bs-dismiss="modal">
                                        <span id="search-icon-1" className="btn bg-light border nput-group-text p-3"><i className="fa fa-search" /></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="carritoModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Carrito de Compra {cart.length} Productos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center bg-primary">
                            <VerCarrito cart={cart} agregar2={agregar2} restar={restar} eliminar={eliminar} vaciar={vaciar} comprar={comprar} />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Header