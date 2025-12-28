export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background md:px-24" id="contacto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Columna 1: Marca y Propósito */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-primary tracking-tight">TIENDA</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Curamos los mejores productos internacionales para llevar calidad premium directamente a tu hogar. Estilo y confianza en cada envío.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Comprar</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Novedades</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Más Vendidos</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Ofertas</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Catálogo Completo</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Soporte */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Ayuda</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Envíos y Entregas</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cambios y Devoluciones</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Columna 4: Newsletter / Redes */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Newsletter</h3>
                        <p className="text-xs text-muted-foreground mb-4">Suscríbete para recibir descuentos exclusivos.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="rounded-md bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90">
                                OK
                            </button>
                        </form>
                    </div>

                </div>

                {/* Línea final e Info Legal */}
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {currentYear} Tienda Inc. Todos los derechos reservados.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Instagram</span>
                            {/* Icono simple de ejemplo */}
                            <div className="w-5 h-5 rounded-md border-2 border-current"></div>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Twitter</span>
                            <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}