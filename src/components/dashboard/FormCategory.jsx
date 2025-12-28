"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";

export default function FormCategory({ category, closeModal }) {
    const { addCategory, editCategory } = useDashboard();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
        },
    });

    // Si es edición, cargamos datos
    useEffect(() => {
        if (category) {
            reset({
                name: category.name || "",
                description: category.description || "",
            });
        }
    }, [category, reset]);

    const onSubmit = async (data) => {
        try {
            if (category) {
                await editCategory(category.id, data);
            } else {
                await addCategory(data);
            }
            closeModal();
        } catch (error) {
            console.error("Error guardando categoría:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h2 className="text-xl font-bold text-slate-900">
                    {category ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
                <p className="text-sm text-slate-500">
                    {category
                        ? "Actualiza la información de la categoría."
                        : "Crea una nueva categoría para organizar tus productos."}
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Nombre */}
                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Electrónica"
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none transition-all
                        ${
                            errors.name
                                ? "border-red-400 focus:ring-red-200"
                                : "border-slate-200 focus:ring-primary/20"
                        }`}
                        {...register("name", {
                            required: "El nombre es obligatorio",
                            minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres",
                            },
                        })}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Descripción */}
                <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">
                        Descripción
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Descripción opcional..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        {...register("description")}
                    />
                </div>

                {/* ACCIONES */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {category ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
}
