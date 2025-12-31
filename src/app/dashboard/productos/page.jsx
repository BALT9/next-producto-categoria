"use client";

import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import FormProd from "@/components/dashboard/FomProduct";

export default function ProductosPanel() {
    const { productos, loading } = useDashboard();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtrado de productos
    const filteredProducts = productos.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* --- CABECERA --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestión de Productos</h1>
                    <p className="text-sm text-slate-500">Añade, edita o elimina productos de tu catálogo.</p>
                </div>
                <button
                    className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center gap-2 w-fit"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span>+</span> Nuevo Producto
                </button>
            </div>

            {/* --- BARRA DE HERRAMIENTAS --- */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- TABLA --- */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <p className="p-6 text-center text-slate-500">Cargando productos...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Producto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Precio</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">📦</div>
                                                <span className="font-semibold text-slate-700">{prod.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">${prod.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-blue-600 shadow-sm">✏️</button>
                                                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-red-500 shadow-sm">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-6 text-slate-500">
                                            No se encontraron productos
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 md:mx-0 p-6 relative max-h-[90vh] overflow-y-auto">
                        {/* Botón de cerrar */}
                        <button
                            className="
                                        absolute top-4 right-4 
                                        w-10 h-10 
                                        flex items-center justify-center 
                                        rounded-full 
                                        bg-red-100 hover:bg-slate-200 
                                        text-slate-600 hover:text-slate-800 
                                        text-2xl font-bold 
                                        transition-colors duration-200
                                        shadow-md
                                        focus:outline-none focus:ring-2 focus:ring-primary/50
                                    "
                            onClick={() => setIsModalOpen(false)}
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>


                        {/* Título opcional dentro del modal */}
                        <h2 className="text-2xl text-center font-bold text-slate-900 mb-4">Nuevo Producto</h2>

                        {/* Formulario */}
                        <FormProd closeModal={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

        </div>
    );
}
