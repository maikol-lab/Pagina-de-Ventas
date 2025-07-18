import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import ModalProductos from "./ModalProductos";
import { CarritoContext } from "../contexts/CarritoContext"
import { formatCurrency } from "../util/funciones";

const CardProductos = ({ item }) => {
    const { cart, agregar } = useContext(CarritoContext)
    const [cant, setCant] = useState(() => {
        const itemInCart = cart.find(cartItem => cartItem.id === item.id);
        return itemInCart ? itemInCart.cantidad : 1;
    });

    const getCantidad = (producto) => {
        return cart.find((item) => item.id === producto.id)?.cantidad || 0
    }

    const totalProd = getCantidad(item)
    const precioTotal = parseFloat(item.price * totalProd);

    const handleChange = (event) => {
        setCant(parseInt(event.target.value));
    };

    return (
        <div className="col-md-4 col-xl-3 mb-3" key={item.id}>
            <div className="card h-100 shadow-sm">
                <div className="card-header p-0 position-relative">
                    {totalProd > 0 && (
                        <span className="badge rounded-pill bg-warning text-dark fs-3 m-1"
                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>
                    )}
                    <img src={item.thumbnail} alt={item.title} className="img-fluid card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title fs-5">{item.title}</h5>
                    <p className="text-muted mb-2">
                        <b>Marca:</b> {item.brand}<br />
                        <b>Stock:</b> {item.stock}
                    </p>
                    <p className="fs-6 text-danger fw-bold">Precio: {formatCurrency(item.price)}</p>
                </div>
                <div className="card-footer text-center bg-white border-top-0">
                    <div className="d-flex justify-content-center mb-2">
                        <button
                            className="btn btn-primary btn-sm me-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#${item.id}`}
                        >
                            <i className="bi bi-eye-fill me-1"></i> Modal
                        </button>
                        <Link
                            to={`/detalle/${item.id}/${item.title}`}
                            className="btn btn-info btn-sm"
                        >
                            <i className="bi bi-info-circle me-1"></i> Detalles
                        </Link>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <select
                            value={cant}
                            onChange={handleChange}
                            className="form-select form-select-sm bg-dark text-white"
                            style={{ width: '70px' }}
                        >
                            {Array.from({ length: Math.min(item.stock, 10) + 1 }, (_, i) => i).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        {totalProd === 0 ? (
                            <button
                                className="btn btn-outline-success btn-sm ms-2"
                                onClick={() => agregar(item, cant)}
                            >
                                <i className="bi bi-cart-plus me-1"></i> Add
                            </button>
                        ) : (
                            <button
                                className="btn btn-outline-warning btn-sm ms-2"
                                onClick={() => agregar(item, cant)}
                            >
                                <i className="bi bi-arrow-repeat me-1"></i> Actualizar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ModalProductos item={item} />
        </div>
    )
}

export default CardProductos;