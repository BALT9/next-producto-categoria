"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardProvider } from "../../context/DashboardContext";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        // { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Productos", href: "/dashboard/productos", icon: "📦" },
        { name: "Categorías", href: "/dashboard/categorias", icon: "🏷️" },
        { name: "Pedidos", href: "/dashboard/pedidos", icon: "🚚" },
    ];

    const NavContent = () => (
        <>
            <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50">
                <span className={`text-xl font-black tracking-tighter text-primary ${(isCollapsed && !isMobileOpen) && 'hidden'}`}>
                    ADMIN.OS
                </span>
                {/* Botón para colapsar (solo visible en desktop) */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:block p-1.5 rounded-lg bg-slate-800 hover:bg-primary transition-colors text-xs"
                >
                    {isCollapsed ? "→" : "←"}
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)} // Cerrar al clickear en móvil
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className={`truncate ${(isCollapsed && !isMobileOpen) && 'lg:hidden'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );

    return (
        <DashboardProvider>
            <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">

                {/* --- SIDEBAR MÓVIL (DRAWER) --- */}
                <div className={`fixed inset-0 z-50 lg:hidden ${isMobileOpen ? "visible" : "invisible"}`}>
                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? "opacity-100" : "opacity-0"}`}
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <aside className={`absolute inset-y-0 left-0 w-72 bg-slate-950 text-white transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <NavContent />
                    </aside>
                </div>

                {/* --- SIDEBAR DESKTOP --- */}
                <aside className={`hidden lg:flex flex-col bg-slate-950 text-white border-r border-slate-800 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
                    <NavContent />
                </aside>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* TOPBAR */}
                    <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-12 sticky top-0 z-40">
                        {/* Botón Hamburguesa Móvil */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            {/* Icono hamburguesa */}
                        </button>

                        <div className="flex-1 px-4 italic font-bold text-slate-400 text-sm hidden sm:block">
                            {pathname.split('/').pop()?.toUpperCase()}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs lg:text-sm">
                                AD
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-4 lg:p-10 overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    );

}