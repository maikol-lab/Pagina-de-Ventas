import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = 'https://dummyjson.com/products/';

const Detalle = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const res = await fetch(API + id);
            if (!res.ok) throw new Error(`Error al cargar datos (status: ${res.status})`);
            const data = await res.json();
            setProducto(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando detalles del producto</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Hubo un problema al cargar los datos</h4>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="btn btn-outline-primary mt-3">
                    ← Volver atrás
                </button>
            </div>
        );
    }

    return (
        <div className="container my-4">
            {/* Botón Volver */}
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary mb-4 d-flex align-items-center"
            >
                <i className="bi bi-arrow-left me-2"></i> Volver
            </button>

            {/* Contenido principal */}
            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="row g-0">
                    {/* Galería de imágenes */}
                    <div className="col-md-5 bg-light">
                        <div className="p-3 h-100 d-flex flex-column">
                            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                                <img
                                    src={producto.images?.[currentImage] || producto.thumbnail}
                                    alt={producto.title}
                                    className="img-fluid rounded-3 object-fit-contain"
                                    style={{ maxHeight: '400px' }}
                                />
                            </div>
                            {producto.images?.length > 1 && (
                                <div className="d-flex mt-3 overflow-auto py-2">
                                    {producto.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Vista ${index + 1} de ${producto.title}`}
                                            className={`img-thumbnail me-2 cursor-pointer ${currentImage === index ? 'border-primary' : ''}`}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            onClick={() => setCurrentImage(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detalles del producto */}
                    <div className="col-md-7">
                        <div className="p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h2 className="fw-bold mb-2">{producto.title}</h2>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-warning text-dark px-2 py-1 rounded d-flex align-items-center me-3">
                                            <i className="bi bi-star-fill me-1"></i>
                                            <span>{producto.rating}</span>
                                        </div>
                                        <span className="text-muted">{producto.reviews?.length || 0} reseñas</span>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className="fs-4 fw-bold text-primary">${producto.price}</div>
                                    <small className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                        {producto.stock > 0 ? 'Disponible' : 'Agotado'}
                                    </small>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="border-bottom pb-2">Descripción</h5>
                                <p className="text-muted">{producto.description}</p>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <h6 className="text-secondary">Categoría</h6>
                                        <p className="fw-medium">{producto.category}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <h6 className="text-secondary">Marca</h6>
                                        <p className="fw-medium">{producto.brand}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <h6 className="text-secondary">Stock</h6>
                                        <p className="fw-medium">{producto.stock} unidades</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <h6 className="text-secondary">Descuento</h6>
                                        <p className="fw-medium text-success">{producto.discountPercentage}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn btn-primary flex-grow-1">
                                    <i className="bi bi-cart-plus me-2"></i> Añadir al carrito
                                </button>
                                <button className="btn btn-outline-secondary">
                                    <i className="bi bi-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reseñas */}
            {producto.reviews?.length > 0 && (
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">
                            <i className="bi bi-chat-square-text text-primary me-2"></i>
                            Reseñas de clientes
                        </h4>
                        <button className="btn btn-sm btn-outline-primary">
                            Escribir reseña
                        </button>
                    </div>

                    <div className="row g-3">
                        {producto.reviews.map((review, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h5 className="mb-0">{review.reviewerName}</h5>
                                            <div className="text-warning">
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                        <small className="text-muted d-block mb-2">
                                            {new Date(review.date).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </small>
                                        <p className="mb-0">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detalle;