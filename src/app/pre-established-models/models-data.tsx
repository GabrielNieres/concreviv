import { FaBed, FaBath, FaCar, FaTree, FaSwimmingPool, FaHome, FaListUl } from "react-icons/fa";
import React from "react";

export const MODELS = [
  {
    id: 1,
    name: "Modelo Evolutivo A",
    style: "Moderno",
    size: "Mediano",
    features: [
      "Piscina", "Jardín", "2 dormitorios", "1 baño", "Plano: 2 dormitorios, 1 baño, living-comedor"
    ],
    images: ["/render1.jpg", "/render1a.jpg"],
    planos: ["/plano1.jpg"],
    video: "https://www.facebook.com/Concreviv/videos/2082961305328770",
    description: "Casa moderna de 120m² con piscina y jardín. Ideal para familias jóvenes.",
    superficies: {
      cubierta: 48.27,
      semicubierta: 1.08,
      descubierta: 0,
      total_cubierta: 48.27,
      total_semicubierta: 1.08,
      total_descubierta: 0,
    },
    ambientes: [
      { nombre: "Estar", superficie: 22.68, medidas: "6,30 x 3,60" },
      { nombre: "Cocina", superficie: 7.56, medidas: "4,20 x 1,80" },
      { nombre: "Baño", superficie: 5.94, medidas: "3,30 x 1,80" },
      { nombre: "Dormitorio 1", superficie: null, medidas: null },
      { nombre: "Dormitorio 2", superficie: null, medidas: null },
    ],
    nota: "Modelo sugerido para lote entre medianeras. Fase inicial.",
    obra: "Los Abedules",
    plano: "Distribución",
  },
  {
    id: 2,
    name: "Modelo 2",
    style: "Clásico",
    size: "Grande",
    features: ["Cochera", "Terraza", "3 dormitorios", "2 baños", "Plano: 3 dormitorios, 2 baños, cochera doble"],
    images: ["/render2.jpg", "/render2a.jpg"],
    planos: ["/plano2.jpg", "/plano3.jpg"],
    video: "https://www.facebook.com/Concreviv/videos/130851127832050",
    description: "Casa clásica de 200m² con cochera y terraza. Espaciosa y luminosa.",
  },
  {
    id: 3,
    name: "Modelo 3",
    style: "Minimalista",
    size: "Pequeño",
    features: ["Jardín", "1 dormitorio", "1 baño", "Plano: 1 dormitorio, 1 baño, cocina integrada"],
    images: ["/render3.jpg", "/render3a.jpg"],
    planos: ["/plano4.jpg"],
    video: "https://www.facebook.com/Concreviv/videos/2225598624377629",
    description: "Casa minimalista de 80m² con jardín. Compacta y funcional.",
  },
  {
    id: 4,
    name: "Modelo 4",
    style: "Moderno",
    size: "Mediano",
    features: ["Piscina", "Jardín", "2 dormitorios", "2 baños", "Plano: 2 dormitorios, 2 baños, galería"],
    images: ["/render4.jpg"],
    planos: ["/plano5.jpg", "/plano6.jpg"],
    video: "https://www.facebook.com/Concreviv/videos/1906481849450498",
    description: "Casa moderna de 130m² con piscina y jardín. Diseño contemporáneo.",
  },
  {
    id: 5,
    name: "Modelo 5",
    style: "Clásico",
    size: "Grande",
    features: ["Cochera", "Terraza", "4 dormitorios", "3 baños", "Plano: 4 dormitorios, 3 baños, terraza amplia"],
    images: ["/render5.jpg", "/render5a.jpg"],
    planos: ["/plano7.jpg"],
    video: "https://www.facebook.com/Concreviv/videos/2214672575456705",
    description: "Casa clásica de 220m² con cochera y terraza. Perfecta para familias grandes.",
  },
];

export function ordenarCaracteristicas(features: string[]) {
  const orden = [
    { key: "dormitorio", icon: <FaBed className="inline mr-2 text-[#65b305]" />, label: "Dormitorios" },
    { key: "baño", icon: <FaBath className="inline mr-2 text-[#65b305]" />, label: "Baños" },
    { key: "cochera", icon: <FaCar className="inline mr-2 text-[#65b305]" />, label: "Cochera" },
    { key: "terraza", icon: <FaHome className="inline mr-2 text-[#65b305]" />, label: "Terraza" },
    { key: "piscina", icon: <FaSwimmingPool className="inline mr-2 text-[#65b305]" />, label: "Piscina" },
    { key: "jardín", icon: <FaTree className="inline mr-2 text-[#65b305]" />, label: "Jardín" },
  ];
  const lower = (s: string) => s.toLowerCase();
  const ordenadas: Array<{icon: React.ReactNode, text: string}> = [];
  const resto: string[] = [];
  features.forEach(f => {
    const found = orden.find(o => lower(f).includes(o.key));
    if (found) {
      ordenadas.push({ icon: found.icon, text: f });
    } else {
      resto.push(f);
    }
  });
  return [
    ...ordenadas,
    ...resto.map((f: string) => ({ icon: <FaListUl className="inline mr-2 text-[#65b305]" />, text: f })),
  ];
} 