"use client";

import { useForm } from "react-hook-form";
import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function FormProd() {
    const { addProduct, categorias } = useDashboard();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // const categories = ["Electrónica", "Muebles", "Accesorios", "Ropa", "Deportes"];

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await addProduct({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                categoryId: parseInt(data.category),
            });
            alert("🚀 Producto guardado con éxito");
            reset();
        } catch (error) {
            alert("❌ Error al guardar el producto");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
            {/* Header Estilizado */}
            <div className="bg-slate-950 p-8 text-center sm:text-left relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black text-white tracking-tight">Nuevo Producto</h2>
                    <p className="text-slate-400 text-sm mt-1">Sincroniza tu inventario en tiempo real.</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-10 space-y-7">

                {/* Nombre */}
                <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Identificación</label>
                    <input
                        {...register("name", { required: "El nombre es obligatorio" })}
                        type="text"
                        placeholder="Nombre del artículo"
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium`}
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Precio */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Inversión (USD)</label>
                        <div className="relative group">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors">$</span>
                            <input
                                {...register("price", {
                                    required: "Indica un precio",
                                    min: { value: 0.01, message: "Precio mínimo 0.01" }
                                })}
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                className={`w-full pl-10 pr-5 py-4 rounded-2xl border ${errors.price ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-700`}
                            />
                        </div>
                        {errors.price && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.price.message}</p>}
                    </div>

                    {/* Categoría */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">
                            Clasificación
                        </label>

                        <div className="relative">
                            <select
                                {...register("categoryId", {
                                    required: "Selecciona una categoría",
                                })}
                                className={`w-full px-5 py-4 rounded-2xl border
                ${errors.categoryId
                                        ? "border-red-500 bg-red-50"
                                        : "border-slate-200 bg-slate-50"
                                    }
                focus:bg-white focus:ring-4 focus:ring-primary/10
                outline-none transition-all appearance-none cursor-pointer
                font-medium text-slate-600`}
                            >
                                <option value="">Elegir categoría...</option>

                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                ▼
                            </div>
                        </div>

                        {errors.categoryId && (
                            <p className="text-red-500 text-xs font-bold mt-1 ml-2">
                                ⚠ {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                </div>

                {/* Descripción */}
                <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Detalles técnicos</label>
                    <textarea
                        {...register("description", {
                            required: "La descripción es necesaria",
                            minLength: { value: 10, message: "Mínimo 10 caracteres" }
                        })}
                        rows="4"
                        placeholder="Describe las ventajas competitivas del producto..."
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.description ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none font-medium text-slate-600`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.description.message}</p>}
                </div>

                {/* Footer del Formulario */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest"
                    >
                        Limpiar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto px-12 py-4 rounded-2xl text-sm font-black text-white uppercase tracking-widest shadow-xl transition-all ${isSubmitting
                            ? 'bg-slate-400 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 active:scale-95 shadow-primary/30'
                            }`}
                    >
                        {isSubmitting ? "Guardando..." : "Confirmar Alta"}
                    </button>
                </div>
            </form>
        </div>
    );
}