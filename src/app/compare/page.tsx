"use client";

import React, { useState } from "react";

const BUILDING_TYPES = ["Tradicional", "Industrializado", "Mixto"];

const COMPARISON_DATA = {
  ourModel: {
    name: "Nuestro Modelo",
    features: ["Construcción rápida", "Calidad garantizada", "Precio fijo", "Diseño personalizable"],
    dimensions: "120m²",
    pricing: "$150,000",
    pros: ["Rápido", "Económico", "Garantía"],
    cons: ["Menos personalizable"],
  },
  traditional: {
    name: "Construcción Tradicional",
    features: ["Construcción manual", "Tiempo variable", "Precio variable", "Diseño limitado"],
    dimensions: "120m²",
    pricing: "$200,000",
    pros: ["Muy personalizable"],
    cons: ["Lento", "Costoso", "Sin garantía"],
  },
  industrialized: {
    name: "Construcción Industrializada",
    features: ["Construcción en fábrica", "Tiempo fijo", "Precio alto", "Diseño estándar"],
    dimensions: "120m²",
    pricing: "$180,000",
    pros: ["Rápido", "Calidad"],
    cons: ["Costoso", "Poco personalizable"],
  },
  mixed: {
    name: "Construcción Mixta",
    features: ["Combinación de métodos", "Tiempo variable", "Precio medio", "Diseño flexible"],
    dimensions: "120m²",
    pricing: "$165,000",
    pros: ["Flexible", "Calidad"],
    cons: ["Tiempo variable", "Complejo"],
  },
};

export default function ComparePage() {
  const [selectedType, setSelectedType] = useState<string>(BUILDING_TYPES[0]);

  const getComparisonData = () => {
    switch (selectedType) {
      case "Tradicional":
        return COMPARISON_DATA.traditional;
      case "Industrializado":
        return COMPARISON_DATA.industrialized;
      case "Mixto":
        return COMPARISON_DATA.mixed;
      default:
        return COMPARISON_DATA.traditional;
    }
  };

  const comparisonData = getComparisonData();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Compara tipos de construcción
        </h1>
        <p className="mb-8 text-gray-600 text-center">
          Selecciona un tipo de construcción para compararlo con nuestro modelo y ver las diferencias.
        </p>
        <div className="flex justify-center mb-8">
          <select
            className="border border-gray-300 rounded-lg p-2 min-w-[200px]"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {BUILDING_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">{COMPARISON_DATA.ourModel.name}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Características:</h3>
                <ul className="space-y-1">
                  {COMPARISON_DATA.ourModel.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dimensiones:</h3>
                <p className="text-lg font-bold text-blue-700">{COMPARISON_DATA.ourModel.dimensions}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Precio:</h3>
                <p className="text-lg font-bold text-blue-700">{COMPARISON_DATA.ourModel.pricing}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ventajas:</h3>
                <ul className="space-y-1">
                  {COMPARISON_DATA.ourModel.pros.map((pro, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Desventajas:</h3>
                <ul className="space-y-1">
                  {COMPARISON_DATA.ourModel.cons.map((con, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-red-600 mr-2">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{comparisonData.name}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Características:</h3>
                <ul className="space-y-1">
                  {comparisonData.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-gray-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dimensiones:</h3>
                <p className="text-lg font-bold text-gray-700">{comparisonData.dimensions}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Precio:</h3>
                <p className="text-lg font-bold text-gray-700">{comparisonData.pricing}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ventajas:</h3>
                <ul className="space-y-1">
                  {comparisonData.pros.map((pro, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Desventajas:</h3>
                <ul className="space-y-1">
                  {comparisonData.cons.map((con, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-red-600 mr-2">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 