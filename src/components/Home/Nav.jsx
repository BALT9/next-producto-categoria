"use client"; // Necesario para el estado en Next.js App Router

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuLinks = [
        { name: "Inicio", href: "/" },
        { name: "Catálogo", href: "#catalogo" },
        // { name: "Ofertas", href: "/ofertas" },
        { name: "Contacto", href: "#contacto" }, // Esto irá al footer
    ];


    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b backdrop-blur md:px-24">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">

                    {/* Logo */}
                    <div className="text-xl font-bold text-primary">TIENDA</div>

                    {/* Menú Desktop (oculto en móviles) */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {menuLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm lg:text-base font-medium hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        <Link
                            href="/dashboard"
                            className="ml-4 rounded-xl bg-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-primary-foreground hover:opacity-90 transition-all"
                        >
                            Dashboard
                        </Link>

                    </div>


                    {/* Botón Hamburguesa (Móvil) */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 md:hidden text-foreground"
                        aria-label="Abrir menú"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* --- SIDEBAR DESLIZABLE --- */}

            {/* Overlay oscuro (se activa cuando el menú está abierto) */}
            <div
                className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={toggleMenu}
            />

            {/* Contenedor del Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-[70] h-full w-64 bg-background p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-white`}
            >
                <div className="flex items-center justify-between mb-10">
                    <span className="text-xl font-bold text-primary">Menú</span>
                    <button onClick={toggleMenu} className="text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {menuLinks.map((link) =>
                        link.href.startsWith("#") ? (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu} // Cierra el menú en mobile
                                className="text-lg font-semibold border-b border-border pb-2 hover:text-primary"
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                className="text-lg font-semibold border-b border-border pb-2 hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        )
                    )}


                    <Link
                        href="/dashboard"
                        onClick={toggleMenu} // Cierra el menú al hacer click en mobile
                        className="mt-4 rounded-xl bg-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold text-primary-foreground hover:opacity-90 transition-all text-center"
                    >
                        Dashboard
                    </Link>
                </div>

            </aside>
        </>
    );
}