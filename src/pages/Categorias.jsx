import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import { useParams } from "react-router-dom"

const API = 'https://dummyjson.com/products/category/';
const Categorias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams()
    const URI = API + params.id

    const getDatos = async () => {
        try {
            const response = await fetch(URI);
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
    }, [params.id]);

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
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 800 }}>
                    <h4 className="text-primary"> Lista de </h4>
                    <h1 className="display-4 mb-4">{params.id}</h1>
                </div>

                <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {datos.map((item) => (
                        <CardProductos key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categorias;