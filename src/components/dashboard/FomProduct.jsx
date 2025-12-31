"use client";

import { useForm } from "react-hook-form";
import { useDashboard } from "@/context/DashboardContext";
import { useEffect, useState } from "react";

export default function FormProd({ closeModal, initialData = null }) {
    const { addProduct, editProduct, categorias } = useDashboard(); // ⚡ editProduct en vez de editCategory
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    // Rellenar formulario si estamos editando
    useEffect(() => {
        if (initialData) {
            setValue("name", initialData.name);
            setValue("description", initialData.description);
            setValue("price", initialData.price);
            setValue("categoryId", initialData.categoryId);
        }
    }, [initialData, setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            if (initialData) {
                // ⚡ Editar producto
                await editProduct(initialData.id, {
                    name: data.name,
                    description: data.description,
                    price: parseFloat(data.price),
                    categoryId: parseInt(data.categoryId),
                });
                alert("✅ Producto actualizado");
            } else {
                // ⚡ Crear producto
                await addProduct({
                    name: data.name,
                    description: data.description,
                    price: parseFloat(data.price),
                    categoryId: parseInt(data.categoryId),
                });
                alert("🚀 Producto guardado");
            }
            reset();
            closeModal();
        } catch (error) {
            console.error(error);
            alert("❌ Error al guardar el producto");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-10 space-y-7">
                {/* Nombre */}
                <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Nombre</label>
                    <input
                        {...register("name", { required: "El nombre es obligatorio" })}
                        type="text"
                        placeholder="Nombre del producto"
                        className={`w-full px-5 py-4 rounded-2xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium`}
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.name.message}</p>}
                </div>

                {/* Precio y categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Precio */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Precio (USD)</label>
                        <input
                            {...register("price", { required: "Indica un precio", min: { value: 0.01, message: "Precio mínimo 0.01" } })}
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.price ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-slate-700`}
                        />
                        {errors.price && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.price.message}</p>}
                    </div>

                    {/* Categoría */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Categoría</label>
                        <select
                            {...register("categoryId", { required: "Selecciona una categoría" })}
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.categoryId ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-medium text-slate-600`}
                        >
                            <option value="">Elegir categoría...</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-xs font-bold mt-1 ml-2">⚠ {errors.categoryId.message}</p>}
                    </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase tracking-wider text-slate-500 ml-1">Descripción</label>
                    <textarea
                        {...register("description")}
                        rows="4"
                        placeholder="Describe las ventajas del producto..."
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none font-medium text-slate-600"
                    ></textarea>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
                    <button type="button" onClick={() => reset()} className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest">Limpiar</button>
                    <button type="submit" disabled={isSubmitting} className={`w-full sm:w-auto px-12 py-4 rounded-2xl text-sm font-black text-white uppercase tracking-widest shadow-xl transition-all ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 active:scale-95 shadow-primary/30'}`}>
                        {isSubmitting ? "Guardando..." : (initialData ? "Actualizar" : "Confirmar Alta")}
                    </button>
                </div>
            </form>
        </div>
    );
}
