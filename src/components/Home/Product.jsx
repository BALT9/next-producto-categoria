"use client";

import { useState } from "react";

const PRODUCTS = [
    { id: 1, name: "Reloj Minimalista", price: 120, category: "Accesorios", tag: "Nuevo" },
    { id: 2, name: "Silla Nórdica", price: 85, category: "Hogar", tag: "Oferta" },
    { id: 3, name: "Auriculares Pro", price: 250, category: "Tecnología", tag: null },
    { id: 4, name: "Lámpara de Mesa", price: 45, category: "Hogar", tag: "Popular" },
    { id: 5, name: "Celular", price: 45, category: "Hogar", tag: "Popular" },
    { id: 6, name: "Cocina", price: 45, category: "Hogar", tag: "Popular" },
    { id: 7, name: "Tablet", price: 150, category: "Tecnología", tag: "Nuevo" },
    { id: 8, name: "Sofá Moderno", price: 300, category: "Hogar", tag: null },
    { id: 9, name: "Zapatos Deportivos", price: 80, category: "Accesorios", tag: "Oferta" },
    { id: 10, name: "Audífonos Bluetooth", price: 120, category: "Tecnología", tag: null },
    { id: 11, name: "Mesa de Centro", price: 90, category: "Hogar", tag: null },
];

export default function ProductGrid() {
    const [visibleCount, setVisibleCount] = useState(6); // mostrar 6 productos inicialmente

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6); // cargar 6 más al hacer click
    };

    const hasMore = visibleCount < PRODUCTS.length;

    return (
        <section className="container mx-auto px-6 py-12 md:px-24" id="catalogo">
            {/* Encabezado del Grid */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Productos Destacados</h2>
                    <p className="text-muted-foreground text-sm">Seleccionados cuidadosamente para ti</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.slice(0, visibleCount).map((product) => (
                    <div key={product.id} className="group relative flex flex-col">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary transition-all group-hover:shadow-lg">
                            {product.tag && (
                                <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">
                                    {product.tag}
                                </span>
                            )}

                            <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 transition-transform duration-500 group-hover:scale-110">
                                <img
                                    src="https://images-cdn.ubuy.do/68efc704a23d8370ba02063e-de-para-zapatos-mujer-moda-tenis.jpg"
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-start">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                                <h3 className="mt-1 text-sm font-semibold text-foreground">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </a>
                                </h3>
                            </div>
                            <p className="text-xl font-bold text-primary">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón Ver Más */}
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
