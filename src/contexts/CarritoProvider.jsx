import { useState, useEffect } from "react";
import { CarritoContext } from "./CarritoContext";

const CarritoProvider = ({ children }) => {
    // Cargar carrito desde localStorage si existe
    const getInitialCart = () => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    };

    const [cart, setCart] = useState(getInitialCart);

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const agregar = (producto, cant) => {
        const cantidad = parseInt(cant);
        if (isNaN(cantidad)) return;
        if (cantidad < 0) return;

        setCart((currItems) => {
            const itemEnCarrito = currItems.find((item) => item.id === producto.id);

            if (cantidad === 0) {
                if (itemEnCarrito) {
                    return currItems.filter((item) => item.id !== producto.id);
                }
                return currItems;
            }

            if (producto.stock < cantidad) {
                alert("La cantidad no puede ser mayor al STOCK!!!!");
                return currItems;
            }

            if (itemEnCarrito) {
                return currItems.map((item) =>
                    item.id === producto.id ? { ...item, cantidad } : item
                );
            }

            return [...currItems, { ...producto, cantidad }];
        });
    };

    const agregar2 = (producto) => {
        setCart((currItems) => {
            const isItemInCart = currItems.find((item) => item.id === producto.id);
            if (isItemInCart) {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...currItems, { ...producto, cantidad: 1 }];
            }
        });
    };

    const restar = (producto) => {
        setCart((currItems) => {
            const existingItem = currItems.find((item) => item.id === producto.id);
            if (!existingItem) return currItems;

            if (existingItem.cantidad === 1) {
                return currItems.filter((item) => item.id !== producto.id);
            } else {
                return currItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            }
        });
    };

    const eliminar = (producto) => {
        const confirmar = window.confirm(
            `¿Estás seguro que deseas eliminar "${producto.title}" del carrito?`
        );

        if (confirmar) {
            setCart((currItems) => {
                return currItems.filter((item) => item.id !== producto.id);
            });
            alert(`Producto "${producto.title}" eliminado correctamente`);
        }
    };

    const vaciar = () => {
        if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
            setCart([]);
            alert("Carrito vaciado");
        }
    };

    const comprar = () => {
        fetch("https://dummyjson.com/carts/add ", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                products: cart.map((item) => ({
                    id: item.id,
                    quantity: item.cantidad,
                })),
            }),
        })
            .then((res) => res.json())
            .then(console.log)
            .catch((error) => console.error(error));

        alert("Gracias por su compra");
        setCart([]);
    };

    return (
        <CarritoContext.Provider value={{ cart, agregar, agregar2, restar, eliminar, vaciar, comprar }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;