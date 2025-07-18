import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import { useLocation } from 'react-router-dom';
const API = 'https://dummyjson.com/products/search?q=';
const Busquedas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // para el estado de la busqueda
    const location = useLocation();
    const txtBuscar = location.state;
    const URI = API + txtBuscar;
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
    }, [txtBuscar]);
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
                    <h4 className="text-primary"> Busqueda de  {datos.length} Productos</h4>
                    <h1 className="display-4 mb-4">{txtBuscar}</h1>



                    <div className="row justify-content-center animate__animated animate__fadeInLeftBig">
                        {datos.map((item) => (
                            <CardProductos key={item.id} item={item} />
                        ))}

                    </div>
                </div>


            </div>
        </div>

    )
}

export default Busquedas;