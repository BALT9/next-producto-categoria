"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import FormCategory from "@/components/dashboard/FormCategory";

export default function CategoriasPanel() {
    const { categorias, loading, addCategory, editCategory, removeCategory } = useDashboard();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openModal = (category = null) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(categorias);
    }, [categorias]);

    return (
        <div className="space-y-8">
            {/* --- HEADER --- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
                    <p className="text-sm text-slate-500">Organiza tus productos en grupos lógicos.</p>
                </div>
                <button
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md"
                    onClick={() => openModal()}
                >
                    + Nueva Categoría
                </button>
            </div>

            {/* --- GRID DE CATEGORÍAS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categorias.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        {/* Fondo decorativo */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 ${cat.color || 'bg-slate-200'}`}></div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`h-14 w-14 rounded-2xl ${cat.color || 'bg-slate-200'} bg-opacity-10 flex items-center justify-center text-2xl`}>
                                    {cat.icono || "📦"}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{cat.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono">/{cat.slug}</p>
                                </div>
                            </div>
                            <button className="text-slate-300 hover:text-slate-600" onClick={() => openModal(cat)}>
                                •••
                            </button>
                        </div>

                        <div className="mt-8 flex items-end justify-between relative z-10">
                            <div>
                                <p className="text-2xl font-black text-slate-900">{cat.products?.length || 0}</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Productos</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 text-xs font-bold bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                                    onClick={() => openModal(cat)}
                                >
                                    Gestionar
                                </button>
                                <button
                                    className="p-2 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                    onClick={() => removeCategory(cat.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Card para añadir rápido */}
                <button
                    className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary hover:text-primary transition-all group"
                    onClick={() => openModal()}
                >
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        +
                    </div>
                    <span className="font-bold text-sm">Crear nueva sección</span>
                </button>
            </div>

            {/* Modal para formulario */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white shadow-xl w-full max-w-3xl p-6 rounded-2xl relative">
                        <button
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-2xl font-bold shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            onClick={closeModal}
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>
                        <FormCategory
                            category={selectedCategory}
                            closeModal={closeModal}
                        />

                    </div>
                </div>
            )}
        </div>
    );
}
