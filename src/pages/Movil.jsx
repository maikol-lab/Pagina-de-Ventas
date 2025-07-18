import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";

const API = 'https://dummyjson.com/products/category/smartphones';

const Movil = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
    }, []);

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
                <h4>Error al cargar los Datos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-light py-5">
            <div className="container py-3">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
                    <h4 className="text-primary">Lista de</h4>
                    <h1 className="display-5 mb-4">Telefonos</h1>
                </div>

                {/* Eliminamos row-cols-* y dejamos que las cards controlen su ancho */}
                <div className="row g-4">
                    {datos.map((item) => (
                        <CardProductos key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movil;