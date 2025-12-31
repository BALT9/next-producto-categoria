"use client";

import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

export default function Hero() {
  const { productos } = useDashboard(); // obtenemos los productos del contexto
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos según búsqueda
  const filteredProducts = productos.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch =
      typeof p.category === "object" &&
      p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  return (
    <section className="relative flex md:min-h-[70vh] flex-col items-center justify-center bg-background px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 text-center">

      {/* Resplandor de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] sm:h-[400px] sm:w-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[100px] sm:blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-3xl">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-snug sm:leading-tight">
          Encuentra lo <span className="text-primary">mejor</span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-muted-foreground">
          Explora miles de productos premium en nuestro catálogo exclusivo.
        </p>

        {/* Buscador */}
        <div className="mt-8 sm:mt-10 relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-3 sm:left-4 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="¿Qué estás buscando hoy?"
              className="w-full rounded-2xl border border-input bg-background py-3 sm:py-5 pl-10 sm:pl-12 pr-24 sm:pr-32 text-sm sm:text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="absolute right-2 sm:right-2 md:right-4 rounded-xl bg-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-primary-foreground hover:opacity-90 transition-all cursor-pointer">
              Buscar
            </button>
          </div>

          {/* Etiquetas rápidas */}
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Tendencias:</span>
            <button className="text-xs sm:text-sm font-medium hover:text-primary underline-offset-4 hover:underline" onClick={() => setSearchTerm("Electrónica")}>Electrónica</button>
            <button className="text-xs sm:text-sm font-medium hover:text-primary underline-offset-4 hover:underline" onClick={() => setSearchTerm("Hogar")}>Hogar</button>
            <button className="text-xs sm:text-sm font-medium hover:text-primary underline-offset-4 hover:underline" onClick={() => setSearchTerm("Accesorios")}>Accesorios</button>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {searchTerm && (
          <div className="mt-6 max-w-3xl mx-auto text-left">
            <h3 className="text-lg font-bold text-foreground mb-2">Resultados para "{searchTerm}"</h3>
            {filteredProducts.length > 0 ? (
              <ul className="space-y-2">
                {filteredProducts.map((p) => (
                  <li key={p.id} className="text-sm sm:text-base text-foreground">
                    {p.name} - {p.category?.name || "Sin categoría"} - ${p.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No se encontraron productos.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
