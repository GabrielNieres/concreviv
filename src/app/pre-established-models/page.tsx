"use client";

import React, { useState } from "react";

const STYLES = ["Moderno", "Clásico", "Minimalista"];
const SIZES = ["Pequeño", "Mediano", "Grande"];
const FEATURES = ["Piscina", "Cochera", "Jardín", "Terraza"];

const MODELS = [
  {
    id: 1,
    name: "Modelo A",
    style: "Moderno",
    size: "Mediano",
    features: ["Piscina", "Jardín"],
    image: "/render1.jpg",
    description: "Casa moderna de 120m² con piscina y jardín.",
  },
  {
    id: 2,
    name: "Modelo B",
    style: "Clásico",
    size: "Grande",
    features: ["Cochera", "Terraza"],
    image: "/render2.jpg",
    description: "Casa clásica de 200m² con cochera y terraza.",
  },
  {
    id: 3,
    name: "Modelo C",
    style: "Minimalista",
    size: "Pequeño",
    features: ["Jardín"],
    image: "/render3.jpg",
    description: "Casa minimalista de 80m² con jardín.",
  },
  {
    id: 4,
    name: "Modelo D",
    style: "Moderno",
    size: "Mediano",
    features: ["Piscina", "Jardín"],
    image: "/render4.jpg",
    description: "Casa moderna de 120m² con piscina y jardín.",
  },
  {
    id: 5,
    name: "Modelo E",
    style: "Clásico",
    size: "Grande",
    features: ["Cochera", "Terraza"],
    image: "/render5.jpg",
    description: "Casa clásica de 200m² con cochera y terraza.",
  },
  {
    id: 6,
    name: "Modelo F",
    style: "Minimalista",
    size: "Pequeño",
    features: ["Jardín"],
    image: "/render3a.jpg",
    description: "Casa minimalista de 80m² con jardín.",
  },
];

export default function PreEstablishedModelsPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string>("");
  const [modalModel, setModalModel] = useState<typeof MODELS[0] | null>(null);

  const filteredModels = MODELS.filter((model) => {
    return (
      (!selectedStyle || model.style === selectedStyle) &&
      (!selectedSize || model.size === selectedSize) &&
      (!selectedFeature || model.features.includes(selectedFeature))
    );
  });

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8">
      <section className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-10 mt-2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#034f1d] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Modelos preaprobados Concreviv
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#4b6358] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Elegí entre nuestros <span className="text-[#65b305] font-bold">modelos preaprobados</span>, desarrollados por el equipo Concreviv. Cada modelo cuenta con <span className="text-[#65b305] font-bold">planos aprobados</span> y documentación técnica completa, lo que te permite iniciar tu proyecto de manera inmediata y sin demoras burocráticas. Estos diseños cumplen con todas las <span className="font-bold">normativas vigentes</span> y garantizan <span className="font-bold">calidad, eficiencia y rapidez constructiva</span>, optimizando tiempos y costos para que puedas concretar tu vivienda con total tranquilidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredModels.length === 0 ? (
            <div className="col-span-full text-center text-[#034f1d]">No hay modelos que coincidan con los filtros.</div>
          ) : (
            filteredModels.map((model) => (
              <div
                key={model.id}
                className="bg-[#e1f7e3] rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col border border-[#65b305]/30"
                onClick={() => setModalModel(model)}
                tabIndex={0}
                aria-label={`Ver detalles de ${model.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setModalModel(model);
                }}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-40 object-contain bg-white p-4"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2 text-[#034f1d]">{model.name}</h2>
                  <div className="text-[#034f1d] mb-1">Estilo: {model.style}</div>
                  <div className="text-[#034f1d] mb-1">Tamaño: {model.size}</div>
                  <div className="text-[#034f1d] mb-2">Características: {model.features.join(", ")}</div>
                  <div className="text-[#65b305] font-semibold mt-auto">Ver detalles</div>
                </div>
              </div>
            ))
          )}
        </div>
        {modalModel && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-40 absolute inset-0" onClick={() => setModalModel(null)} />
            <div className="relative bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto flex flex-col items-center border border-[#65b305]/30">
              <img
                src={modalModel.image}
                alt={modalModel.name}
                className="w-40 h-40 object-contain bg-white mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-[#034f1d]">{modalModel.name}</h2>
              <div className="text-[#034f1d] mb-1">Estilo: {modalModel.style}</div>
              <div className="text-[#034f1d] mb-1">Tamaño: {modalModel.size}</div>
              <div className="text-[#034f1d] mb-2">Características: {modalModel.features.join(", ")}</div>
              <p className="text-[#034f1d] mb-4 text-center">{modalModel.description}</p>
              <button
                className="mt-2 px-6 py-2 bg-[#65b305] text-white rounded-lg font-semibold shadow hover:bg-[#034f1d] transition"
                onClick={() => setModalModel(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 