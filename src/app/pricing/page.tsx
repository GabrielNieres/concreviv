"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const PRICING_TIERS = [
  {
    id: 1,
    name: "Básico",
    pricePerSqm: 1200,
    totalPrice: 144000,
    description: "Casa funcional con acabados estándar",
    features: [
      "Construcción básica",
      "Acabados estándar",
      "Instalaciones básicas",
      "Pintura interior",
    ],
    additionalCosts: [
      { item: "Permisos municipales", cost: 5000 },
      { item: "Conexión de servicios", cost: 8000 },
      { item: "Cercado perimetral", cost: 12000 },
    ],
  },
  {
    id: 2,
    name: "Estándar",
    pricePerSqm: 1500,
    totalPrice: 180000,
    description: "Casa con acabados de calidad media",
    features: [
      "Construcción estándar",
      "Acabados de calidad",
      "Instalaciones completas",
      "Pintura interior y exterior",
      "Cocina equipada",
    ],
    additionalCosts: [
      { item: "Permisos municipales", cost: 5000 },
      { item: "Conexión de servicios", cost: 8000 },
      { item: "Cercado perimetral", cost: 12000 },
      { item: "Jardín básico", cost: 8000 },
    ],
  },
  {
    id: 3,
    name: "Premium",
    pricePerSqm: 2000,
    totalPrice: 240000,
    description: "Casa con acabados de lujo",
    features: [
      "Construcción premium",
      "Acabados de lujo",
      "Instalaciones avanzadas",
      "Pintura premium",
      "Cocina de lujo",
      "Sistema de seguridad",
    ],
    additionalCosts: [
      { item: "Permisos municipales", cost: 5000 },
      { item: "Conexión de servicios", cost: 8000 },
      { item: "Cercado perimetral", cost: 12000 },
      { item: "Jardín paisajístico", cost: 15000 },
      { item: "Sistema de riego", cost: 5000 },
    ],
  },
];

const CONSTRUCTION_COSTS = [
  { item: "Fundaciones", cost: 15000, percentage: 10 },
  { item: "Estructura", cost: 30000, percentage: 20 },
  { item: "Muros y techos", cost: 25000, percentage: 17 },
  { item: "Instalaciones", cost: 20000, percentage: 13 },
  { item: "Acabados", cost: 35000, percentage: 23 },
  { item: "Equipamiento", cost: 15000, percentage: 10 },
  { item: "Gastos generales", cost: 10000, percentage: 7 },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<number>(2);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [surface, setSurface] = useState(100);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const selectedPricing = PRICING_TIERS.find(tier => tier.id === selectedTier)!;
  const totalAdditionalCosts = selectedPricing.additionalCosts.reduce((sum, cost) => sum + cost.cost, 0);
  const subtotal = surface * selectedPricing.pricePerSqm;
  const grandTotal = subtotal + totalAdditionalCosts;

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-[#034f1d]">
            Precios fijos y transparentes
          </h1>
          <p className="text-xl text-[#034f1d] max-w-3xl mx-auto">
            Precios claros y detallados por metro cuadrado. Sin sorpresas ni costos ocultos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedTier === tier.id
                  ? "border-[#65b305] bg-[#e1f7e3]"
                  : "border-[#e1f7e3] bg-white hover:border-[#65b305]/50"
              }`}
              onClick={() => setSelectedTier(tier.id)}
            >
              <h2 className="text-2xl font-bold mb-2 text-[#034f1d]">{tier.name}</h2>
              <p className="text-[#034f1d] mb-4">{tier.description}</p>
              <div className="text-3xl font-bold text-[#65b305] mb-2">
                ${tier.pricePerSqm.toLocaleString()}/m²
              </div>
              <div className="text-lg text-[#034f1d] mb-4">
                Total: ${tier.totalPrice.toLocaleString()}
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-[#034f1d]">
                    <span className="text-[#65b305] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#034f1d]">
          Detalle de costos - {selectedPricing.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#034f1d]">Precio base</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#e1f7e3] rounded-lg">
                <span>Precio por m²</span>
                <span className="font-semibold">${selectedPricing.pricePerSqm.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold text-[#034f1d]">Superficie (m²):</span>
                <input
                  type="number"
                  min={80}
                  max={160}
                  value={surface}
                  onChange={e => setSurface(Math.max(80, Math.min(160, Number(e.target.value))))}
                  className="w-24 text-2xl font-bold text-[#65b305] bg-[#e1f7e3] border border-[#b6e7b9] rounded-lg px-3 py-1 text-center focus:outline-[#65b305] focus:ring-2 focus:ring-[#65b305] transition"
                  aria-label="Metros cuadrados"
                />
                <span className="text-2xl font-bold text-[#65b305]">m²</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#e1f7e3] rounded-lg border border-[#65b305]/30">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold text-[#65b305]">${subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#034f1d]">Costos adicionales</h3>
            <div className="space-y-3">
              {selectedPricing.additionalCosts.map((cost, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#e1f7e3] rounded-lg">
                  <span>{cost.item}</span>
                  <span className="font-semibold">${cost.cost.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 bg-[#e1f7e3] rounded-lg border border-[#65b305]/30">
                <span className="font-semibold">Total Adicionales</span>
                <span className="font-bold text-[#65b305]">${totalAdditionalCosts.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-[#e1f7e3] rounded-xl border border-[#65b305]/30">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#034f1d]">Precio total</span>
              <span className="text-3xl font-bold text-[#65b305]">${grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <a
                href="https://wa.me/5491133344455"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-18 h-18 flex items-center justify-center text-4xl shadow transition-colors"
              >
                <FaWhatsapp />
              </a>
              <button
                className="border border-[#65b305] text-[#034f1d] hover:bg-[#65b305] hover:text-white font-semibold rounded-lg px-6 py-2 transition-colors shadow"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("construction")}
          >
            <h2 className="text-2xl font-bold text-[#034f1d]">
              Detalle de costos de construcción
            </h2>
            <span className="text-2xl">{expandedSections.has("construction") ? "−" : "+"}</span>
          </div>
          
          {expandedSections.has("construction") && (
            <div className="mt-6 space-y-4">
              {CONSTRUCTION_COSTS.map((cost, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#e1f7e3] rounded-lg">
                  <span>{cost.item}</span>
                  <span className="font-semibold">${cost.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">
            ⚠️ Información Importante sobre Precios
          </h2>
          <div className="space-y-4 text-yellow-800">
            <p>
              <strong>Precios actualizados al:</strong> {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p>
              Los precios mostrados pueden variar según la ubicación, características específicas del terreno, 
              y modificaciones personalizadas al diseño base.
            </p>
            <p>
              <strong>Para obtener una cotización actualizada y personalizada:</strong> Contáctanos y te 
              proporcionaremos un presupuesto detallado basado en tus necesidades específicas.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 