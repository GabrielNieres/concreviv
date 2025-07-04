"use client";

import React, { useState } from "react";

const SIZES = [
  { label: "80 m²", value: 80, base: 1200 },
  { label: "120 m²", value: 120, base: 1500 },
  { label: "160 m²", value: 160, base: 1800 },
];
const STYLES = [
  { label: "Moderno", multiplier: 1.0 },
  { label: "Clásico", multiplier: 1.05 },
  { label: "Minimalista", multiplier: 0.98 },
];
const MATERIALS = [
  { label: "Estándar", cost: 0 },
  { label: "Premium", cost: 8000 },
  { label: "Lujo", cost: 18000 },
];
const EXTRAS = [
  { label: "Piscina", cost: 25000 },
  { label: "Cochera", cost: 12000 },
  { label: "Jardín paisajístico", cost: 15000 },
  { label: "Sistema de seguridad", cost: 9000 },
];

export default function CostCalculatorPage() {
  const [style, setStyle] = useState(STYLES[0]);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [surface, setSurface] = useState(120);

  const handleExtraChange = (label: string) => {
    setSelectedExtras((prev) =>
      prev.includes(label)
        ? prev.filter((e) => e !== label)
        : [...prev, label]
    );
  };

  const extrasCost = EXTRAS.filter((e) => selectedExtras.includes(e.label)).reduce((sum, e) => sum + e.cost, 0);
  const baseCost = surface * SIZES[1].base * style.multiplier;
  const total = Math.round(baseCost + material.cost + extrasCost);

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#034f1d]">
          Calculadora de costos
        </h1>
        <p className="mb-8 text-[#034f1d] text-center">
          Seleccioná las características de tu casa y obtené una estimación instantánea del costo.
        </p>
        <form className="space-y-8">
          <div>
            <label className="block mb-2 font-semibold text-[#034f1d]">Superficie (m²): <span className="text-[#65b305]">{surface}</span></label>
            <input
              type="range"
              min={80}
              max={160}
              step={1}
              value={surface}
              onChange={e => setSurface(Number(e.target.value))}
              className="w-full accent-[#65b305] h-2 rounded-lg appearance-none bg-gray-700 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#034f1d]">Estilo</label>
            <div className="flex gap-4">
              {STYLES.map((s) => (
                <button
                  type="button"
                  key={s.label}
                  className={`px-4 py-2 rounded-lg border font-medium transition focus:outline-none focus:ring-2 focus:ring-[#65b305] ${
                    style.label === s.label
                      ? "bg-[#65b305] text-white border-[#65b305] shadow"
                      : "bg-[#e1f7e3] text-[#034f1d] border-[#e1f7e3] hover:bg-[#65b305]/10"
                  }`}
                  onClick={() => setStyle(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#034f1d]">Materiales</label>
            <div className="flex gap-4">
              {MATERIALS.map((m) => (
                <button
                  type="button"
                  key={m.label}
                  className={`px-4 py-2 rounded-lg border font-medium transition focus:outline-none focus:ring-2 focus:ring-[#65b305] ${
                    material.label === m.label
                      ? "bg-[#65b305] text-white border-[#65b305] shadow"
                      : "bg-[#e1f7e3] text-[#034f1d] border-[#e1f7e3] hover:bg-[#65b305]/10"
                  }`}
                  onClick={() => setMaterial(m)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#034f1d]">Extras</label>
            <div className="flex flex-wrap gap-4">
              {EXTRAS.map((e) => (
                <label key={e.label} className="flex items-center gap-2 cursor-pointer text-[#034f1d]">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(e.label)}
                    onChange={() => handleExtraChange(e.label)}
                    className="accent-[#65b305]"
                  />
                  <span>{e.label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
        <div className="mt-10 p-6 bg-[#e1f7e3] rounded-xl border border-[#65b305]/30">
          <h2 className="text-2xl font-bold mb-4 text-[#034f1d] text-center">Resumen de la estimación</h2>
          <ul className="mb-4 text-[#034f1d]">
            <li>
              <span className="font-semibold">Superficie:</span> {surface} m²
            </li>
            <li>
              <span className="font-semibold">Estilo:</span> {style.label}
            </li>
            <li>
              <span className="font-semibold">Materiales:</span> {material.label}
            </li>
            <li>
              <span className="font-semibold">Extras:</span> {selectedExtras.length > 0 ? selectedExtras.join(", ") : "Ninguno"}
            </li>
          </ul>
          <div className="flex justify-between items-center text-xl font-bold text-[#034f1d]">
            <span>Total estimado:</span>
            <span className="text-3xl text-[#65b305]">${total.toLocaleString('es-AR')}</span>
          </div>
        </div>
        <div className="mt-8 text-center text-[#034f1d] text-sm">
          * Esta es una estimación referencial. El precio final puede variar según especificaciones y ubicación.
        </div>
      </section>
    </main>
  );
} 