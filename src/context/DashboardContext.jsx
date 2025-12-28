"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "@/services/useApi";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Fetch inicial ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productosData = await getProducts();
                const categoriasData = await getCategories();
                setProductos(productosData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error("Error al cargar datos del dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Funciones para productos ---
    const addProduct = async (data) => {
        try {
            const nuevoProducto = await createProduct(data);
            setProductos((prev) => [...prev, nuevoProducto]);
            return nuevoProducto;
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    const editProduct = async (id, data) => {
        try {
            const updated = await updateProduct(id, data);
            setProductos((prev) =>
                prev.map((prod) => (prod.id === id ? updated : prod))
            );
            return updated;
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    const removeProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProductos((prev) => prev.filter((prod) => prod.id !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    // --- Funciones para categorías ---
    const addCategory = async (data) => {
        try {
            const nuevaCategoria = await createCategory(data);
            setCategorias((prev) => [...prev, nuevaCategoria]);
            return nuevaCategoria;
        } catch (error) {
            console.error("Error al crear categoría:", error);
        }
    };

    const editCategory = async (id, data) => {
        try {
            const updated = await updateCategory(id, data);
            setCategorias((prev) =>
                prev.map((cat) => (cat.id === id ? updated : cat))
            );
            return updated;
        } catch (error) {
            console.error("Error al actualizar categoría:", error);
        }
    };

    const removeCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategorias((prev) => prev.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                productos,
                categorias,
                loading,
                addProduct,
                editProduct,
                removeProduct,
                addCategory,
                editCategory,
                removeCategory,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);
