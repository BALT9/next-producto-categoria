"use client";

import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

const STATIC_IMAGE = "https://images-cdn.ubuy.do/68efc704a23d8370ba02063e-de-para-zapatos-mujer-moda-tenis.jpg";

export default function Product() {
    const { productos } = useDashboard(); // obtenemos los productos del contexto
    const [visibleCount, setVisibleCount] = useState(6);

    const handleShowMore = () => setVisibleCount((prev) => prev + 6);
    const hasMore = visibleCount < productos.length;

    if (!productos) {
        return <p className="text-center py-12 text-slate-500">Cargando productos...</p>;
    }

    return (
        <section className="container mx-auto px-6 py-12 md:px-24" id="catalogo">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Productos Destacados</h2>
                    <p className="text-muted-foreground text-sm">Seleccionados cuidadosamente para ti</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {productos.slice(0, visibleCount).map((product) => (
                    <div key={product.id} className="group relative flex flex-col">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary transition-all group-hover:shadow-lg">
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 transition-transform duration-500 group-hover:scale-110">
                                <img
                                    src={STATIC_IMAGE}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-start">
                            <div>
                                <h3 className="mt-1 text-sm font-semibold text-foreground">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="text-xs  tracking-wider text-gray-100">
                                    {product.description}
                                </p>
                            </div>
                            <p className="text-xl font-bold text-primary">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleShowMore}
                        className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all"
                    >
                        Ver más productos
                    </button>
                </div>
            )}
        </section>
    );
}
