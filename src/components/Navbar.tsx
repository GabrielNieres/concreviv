"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AuthWidget from "./AuthWidget";
import Image from "next/image";
import { FaPaintBrush, FaHome, FaCalculator, FaCalendarAlt, FaKey, FaDollarSign, FaTachometerAlt, FaUsers } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    { name: "Inicio", href: "/", icon: <FaHome /> },
    { name: "Conocer el sistema", href: "/conocer-el-sistema", icon: <FaKey /> },
    // { name: "Diseño", href: "/design-customization", icon: <FaPaintBrush /> },
    { name: "Modelos", href: "/pre-established-models", icon: <FaHome /> },
    // { name: "Calculadora de costos", href: "/cost-calculator", icon: <FaCalculator /> },
    { name: "Llave en mano", href: "/turnkey", icon: <FaKey /> },
    { name: "Precios", href: "/pricing", icon: <FaDollarSign /> },
    { name: "Quiénes somos", href: "/quienes-somos", icon: <FaUsers /> },
    { name: "Agendar consulta", href: "/designer-collaboration", icon: <FaCalendarAlt /> },
  ];
  if (user) {
    navItems.push({ name: "Panel", href: "/dashboard", icon: <FaTachometerAlt /> });
  }

  return (
    <nav className="w-full px-0 py-2 relative z-50">
      <div className="w-full rounded-2xl shadow-xl bg-white/60 backdrop-blur-md border border-[#b6e7b9] flex flex-row items-center justify-between px-2 md:px-8 py-2 mt-2">
        {/* Logo a la izquierda */}
        <Link href="/" className="focus:outline focus:outline-2 focus:outline-[#65b305]" aria-label="Ir a la página principal">
          <Image
            src="/logo1.png"
            alt="Logo de Concreviv"
            width={112}
            height={112}
            className="rounded object-contain"
            priority
          />
        </Link>
        {/* Imagen concreviv.png centrada */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/concreviv.png"
            alt="Concreviv"
            width={224}
            height={112}
            className="object-contain"
            priority={false}
          />
        </div>
        {/* Botón login/hamburguesa a la derecha */}
        <div className="flex flex-row items-center gap-2">
          <button
            className="md:hidden p-2 rounded focus:outline focus:outline-2 focus:outline-[#65b305]"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block w-6 h-0.5 bg-[#034f1d] mb-1"></span>
            <span className="block w-6 h-0.5 bg-[#034f1d] mb-1"></span>
            <span className="block w-6 h-0.5 bg-[#034f1d]"></span>
          </button>
          <div className="hidden md:block"><AuthWidget /></div>
        </div>
      </div>
      {/* Menú horizontal en desktop */}
      <ul className="hidden md:flex flex-wrap gap-4 text-[16px] font-bold mt-4 justify-center rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-[#b6e7b9] px-6 py-2 w-full mx-0">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#65b305]/20 hover:shadow-lg hover:scale-105 focus:outline focus:outline-2 focus:outline-[#65b305] font-bold group relative"
            >
              <span className="text-[#65b305] text-lg">{item.icon}</span>
              <span className="relative">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Overlay menú hamburguesa en mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex flex-col">
          <div className="bg-white/90 backdrop-blur-md w-full max-w-xs h-full shadow-lg p-8 flex flex-col gap-8 animate-slide-in-left relative rounded-r-2xl border border-[#b6e7b9] mt-2">
            <button
              className="absolute top-4 right-4 text-3xl text-[#034f1d] focus:outline focus:outline-2 focus:outline-[#65b305]"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <nav>
              <ul className="flex flex-col gap-6 text-[20px] font-bold pt-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 hover:bg-[#65b305]/20 hover:shadow-lg hover:scale-105 focus:outline focus:outline-2 focus:outline-[#65b305] font-bold group relative"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-[#65b305] text-xl">{item.icon}</span>
                      <span className="relative">
                        {item.name}
                        <span className="block h-0.5 bg-[#65b305] scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute left-0 right-0 -bottom-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto"><AuthWidget /></div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
} 