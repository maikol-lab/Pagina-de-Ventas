import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import { Badge, Button } from "react-bootstrap";

const ModalProductos = ({ item }) => {
    const { agregar2 } = useContext(CarritoContext);

    return (
        <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby={`modalLabel-${item.id}`} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    {/* Encabezado del modal */}
                    <div className="modal-header bg-dark text-white">
                        <h2 className="modal-title fs-4 fw-bold" id={`modalLabel-${item.id}`}>
                            <i className="bi bi-box-seam me-2"></i>
                            {item.title}
                        </h2>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>

                    {/* Cuerpo del modal */}
                    <div className="modal-body p-4">
                        <div className="row g-4">
                            {/* Columna de la imagen */}
                            <div className="col-md-5">
                                <div className="position-relative">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="img-fluid rounded-3 shadow-sm border"
                                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                                    />
                                    {item.discountPercentage > 0 && (
                                        <Badge bg="danger" className="position-absolute top-0 start-0">
                                            -{item.discountPercentage}%
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Columna de detalles */}
                            <div className="col-md-7">
                                <div className="d-flex flex-column h-100">
                                    {/* Información básica */}
                                    <div className="mb-3">
                                        <Badge bg="primary" className="me-2">{item.category}</Badge>
                                        <Badge bg="secondary">{item.brand}</Badge>

                                        <div className="d-flex align-items-center mt-2">
                                            <div className="text-warning me-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`bi ${i < Math.floor(item.rating) ? 'bi-star-fill' : 'bi-star'}`}
                                                    ></i>
                                                ))}
                                            </div>
                                            <small className="text-muted">({item.rating}/5)</small>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <p className="text-muted mb-4 flex-grow-1">{item.description}</p>

                                    {/* Detalles importantes */}
                                    <div className="border-top pt-3">
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                <div className="text-secondary small">Disponibilidad</div>
                                                <div className={item.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                                    {item.stock > 0 ? `${item.stock} unidades` : 'Agotado'}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <div className="text-secondary small">Precio</div>
                                                <div className="fs-4 fw-bold text-primary">
                                                    ${item.price}
                                                    {item.discountPercentage > 0 && (
                                                        <small className="text-decoration-line-through text-muted ms-2 fs-6">
                                                            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-secondary small">Código</div>
                                                <div className="fw-medium">{item.id}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pie del modal */}
                    <div className="modal-footer bg-light">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                        >
                            <i className="bi bi-x-lg me-2"></i> Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={item.stock <= 0}
                            onClick={() => {
                                agregar2(item);
                                // Cierra el modal después de agregar
                                const modal = bootstrap.Modal.getInstance(document.getElementById(item.id));
                                modal.hide();
                            }}
                        >
                            <i className="bi bi-cart-plus me-2"></i> Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProductos;