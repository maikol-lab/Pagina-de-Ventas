import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const VerCarrito = ({ cart, agregar2, restar, eliminar, vaciar, comprar }) => {
    const formatCurrency = (value) => {
        const numero = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
        if (isNaN(numero)) return '0,00';

        return new Intl.NumberFormat('es-VE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numero);
    };

    const totalCantidad = cart.reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = cart.reduce((total, item) => total + item.cantidad * item.price, 0);
    const navigate = useNavigate();
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="page-header">
                        <h2 className="text-4xl font-bold mb-4">Carrito de Compras</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="bg-light">
                                <tr>
                                    <th className="text-center" width="100px">Imagen</th>
                                    <th>Producto</th>
                                    <th className="text-center">Precio</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Subtotal</th>
                                    <th className="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="img-fluid"
                                                    style={{ maxWidth: '80px' }}
                                                />
                                            </td>
                                            <td>
                                                <h5 className="product-title mb-1">{item.title}</h5>
                                            </td>
                                            <td className="text-center text-white">${formatCurrency(item.price)}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-warning me-2"
                                                        onClick={() => restar({ ...item })}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.cantidad}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark ms-2"
                                                        onClick={() => agregar2(item)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center text-white">${formatCurrency(item.price * item.cantidad)}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => eliminar(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            <h5>Tu carrito está vacío</h5>
                                            <button className="btn btn-dark ms-2" data-bs-dismiss="modal">
                                                <i className="fas fa-shopping-bag me-2"></i>
                                                Continuar comprando
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {cart.length > 0 && (
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="coupon-form">
                                    <h5 className="mb-3">Código de Descuento</h5>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingresa tu código"
                                        />
                                        <button className="btn btn-dark" type="button">
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={vaciar}
                                >
                                    <i className="fas fa-sync-alt me-2"></i>
                                    Vaciar Carrito
                                </button>

                                <button className="btn btn-dark ms-2" data-bs-dismiss="modal">
                                    <i className="fas fa-shopping-bag me-2"></i>
                                    Continuar comprando
                                </button>

                            </div>
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Resumen del Pedido</h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>${formatCurrency(totalPrecio)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Envío:</span>
                                    <span>Gratis</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Total:</h6>
                                    <h6>${formatCurrency(totalPrecio)}</h6>
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={comprar}
                                >
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Métodos de Pago</h5>
                                <div className="payment-methods">
                                    <span data-bs-toggle="tooltip" title="Visa">
                                        <i className="fab fa-cc-visa fa-2x me-3"></i>
                                    </span>
                                    <span data-bs-toggle="tooltip" title="Mastercard">
                                        <i className="fab fa-cc-mastercard fa-2x me-3"></i>
                                    </span>
                                    <span data-bs-toggle="tooltip" title="PayPal">
                                        <i className="fab fa-cc-paypal fa-2x me-3"></i>
                                    </span>
                                    <span data-bs-toggle="tooltip" title="Stripe">
                                        <i className="fab fa-cc-stripe fa-2x me-3"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerCarrito;