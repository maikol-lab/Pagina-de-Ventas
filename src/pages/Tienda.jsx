import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";

const API = 'https://dummyjson.com/products?limit=5&skip=';
const Tienda = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [skip, setSkip] = useState(0);
    const totalProducts = 100; // Total de productos en la API
    const limit = 5; // Productos por página

    const getDatos = async () => {
        try {
            const response = await fetch(`${API}${skip}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setDatos(data.products);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, [skip]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los datos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container-fluid feature bg-light py-5">
            <div className="container py-5">
                {/* Encabezado IDÉNTICO a los otros componentes */}
                <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                    <h4 className="text-primary">Lista de</h4>
                    <h1 className="display-4 mb-4">Productos</h1>

                    {/* Paginación - colocada aquí para no interferir con el grid */}
                    <div className="d-flex justify-content-center mb-4">
                        <button
                            className="btn btn-outline-primary mx-1"
                            onClick={() => setSkip(prev => Math.max(0, prev - limit))}
                            disabled={skip === 0}
                        >
                            &lt; Anterior
                        </button>
                        <span className="mx-3 align-self-center">
                            Página {Math.floor(skip / limit) + 1} de {Math.ceil(totalProducts / limit)}
                        </span>
                        <button
                            className="btn btn-outline-primary mx-1"
                            onClick={() => setSkip(prev => prev + limit)}
                            disabled={skip + limit >= totalProducts}
                        >
                            Siguiente &gt;
                        </button>
                    </div>
                </div>

                {/* 
                  * GRID DE PRODUCTOS - ESTRUCTURA EXACTA A LOS OTROS COMPONENTES
                  * Usando las mismas clases y estructura que Vehiculos.jsx, Laptop.jsx, etc.
                  */}
                <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {datos.map((item) => (
                        <CardProductos key={item.id} item={item} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Tienda;