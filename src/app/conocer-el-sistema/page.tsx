"use client";

import React from "react";

export default function ConocerElSistemaPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-8 px-2">
      {/* HERO SECTION */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-0 mb-12 overflow-hidden relative flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#034f1d] mb-4">Conocer el sistema</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#16a34a] mb-4">La guía completa para encofrados de acero</h2>
          <p className="text-lg text-[#034f1d] mb-6 max-w-xl">
            Descubrí cómo la tecnología de encofrados metálicos de CONCREVIV revoluciona la construcción de viviendas: máxima calidad, eficiencia y terminaciones premium en tiempo récord.
          </p>
        </div>
        <div className="flex-1 min-w-[300px] h-[320px] md:h-[420px] relative">
          <img src="/encofrado1.jpg" alt="Sistema de encofrado Concreviv" className="object-cover w-full h-full rounded-l-2xl md:rounded-r-2xl shadow-lg" />
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-4">¿Qué es un encofrado de acero?</h3>
        <p className="text-[#034f1d] text-lg mb-4">
          El encofrado de acero es una estructura temporal que se utiliza para soportar y dar forma al hormigón fresco durante el proceso de construcción. Está compuesto por placas y marcos de acero de alta resistencia, lo que garantiza que el hormigón mantenga la forma diseñada mientras fragua y adquiere su resistencia final. En CONCREVIV, utilizamos encofrados metálicos de última generación para asegurar terminaciones perfectas, máxima durabilidad y eficiencia en cada obra.
        </p>
        <div className="flex justify-center">
          <img src="/encofrado2.jpg" alt="Detalle encofrado acero" className="w-80 h-56 object-cover rounded-xl shadow" />
        </div>
      </section>

      {/* TIPOS DE ENCOFRADO */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Tipos de encofrado de acero</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-[#e1f7e3] rounded-xl p-6 shadow">
            <img src="/encofrado3.jpg" alt="Encofrado de muros" className="w-24 h-24 object-cover rounded-full mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-1">Muros y tabiques</h4>
            <p className="text-[#034f1d] text-sm text-center">Para paredes verticales, máxima precisión y terminación.</p>
          </div>
          <div className="flex flex-col items-center bg-[#e1f7e3] rounded-xl p-6 shadow">
            <img src="/encofrado4.jpg" alt="Encofrado de losas" className="w-24 h-24 object-cover rounded-full mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-1">Losas y pisos</h4>
            <p className="text-[#034f1d] text-sm text-center">Para entrepisos y techos, resistencia y rapidez en grandes superficies.</p>
          </div>
          <div className="flex flex-col items-center bg-[#e1f7e3] rounded-xl p-6 shadow">
            <img src="/encofrado5.jpg" alt="Encofrado modular" className="w-24 h-24 object-cover rounded-full mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-1">Sistemas modulares</h4>
            <p className="text-[#034f1d] text-sm text-center">Flexibilidad para diseños personalizados y obras de cualquier escala.</p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DEL SISTEMA */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Beneficios del sistema CONCREVIV</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img src="/hormigon-visto1.jpg" alt="Calidad premium" className="w-32 h-32 object-cover rounded-xl mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-2">Calidad premium</h4>
            <p className="text-[#034f1d] text-center">Superficies lisas, terminaciones perfectas y máxima durabilidad en cada obra.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/hormigon-visto2.jpg" alt="Rapidez constructiva" className="w-32 h-32 object-cover rounded-xl mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-2">Rapidez constructiva</h4>
            <p className="text-[#034f1d] text-center">Obras listas en tiempo récord gracias al montaje eficiente y la reutilización de los encofrados.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/hormigon-visto3.jpg" alt="Eficiencia y ahorro" className="w-32 h-32 object-cover rounded-xl mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-2">Eficiencia y ahorro</h4>
            <p className="text-[#034f1d] text-center">Menos desperdicio, menos mano de obra y reducción de costos a largo plazo.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/render1.jpg" alt="Sustentabilidad" className="w-32 h-32 object-cover rounded-xl mb-3" />
            <h4 className="font-bold text-[#034f1d] mb-2">Sustentabilidad</h4>
            <p className="text-[#034f1d] text-center">Materiales reciclables y procesos responsables con el medio ambiente.</p>
          </div>
        </div>
      </section>

      {/* EJEMPLOS DE APLICACIÓN */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">¿Qué se puede construir con el sistema?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-[#f6fef7] rounded-xl p-4 shadow">
            <img src="/render2.jpg" alt="Viviendas familiares" className="w-full h-32 object-cover rounded-lg mb-2" />
            <h4 className="font-bold text-[#034f1d] mb-1">Viviendas familiares</h4>
            <p className="text-[#034f1d] text-sm text-center">Casas de 1 a 3 plantas, adaptadas a cada necesidad.</p>
          </div>
          <div className="flex flex-col items-center bg-[#f6fef7] rounded-xl p-4 shadow">
            <img src="/render3.jpg" alt="Desarrollos residenciales" className="w-full h-32 object-cover rounded-lg mb-2" />
            <h4 className="font-bold text-[#034f1d] mb-1">Desarrollos residenciales</h4>
            <p className="text-[#034f1d] text-sm text-center">Conjuntos de viviendas, dúplex y edificios de baja altura.</p>
          </div>
          <div className="flex flex-col items-center bg-[#f6fef7] rounded-xl p-4 shadow">
            <img src="/render4.jpg" alt="Obras a medida" className="w-full h-32 object-cover rounded-lg mb-2" />
            <h4 className="font-bold text-[#034f1d] mb-1">Obras a medida</h4>
            <p className="text-[#034f1d] text-sm text-center">Locales comerciales, quinchos, ampliaciones y más.</p>
          </div>
        </div>
      </section>

      {/* RAPIDEZ Y PROCESO */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Rapidez y proceso constructivo</h3>
        <ol className="list-decimal list-inside text-[#034f1d] text-lg space-y-2 mb-6">
          <li><b>Preparación:</b> Revisión y limpieza del sistema, preparación del sitio y herramientas.</li>
          <li><b>Montaje:</b> Armado y fijación del encofrado según planos, asegurando conexiones y alineación.</li>
          <li><b>Apuntalamiento:</b> Instalación de soportes para garantizar estabilidad y precisión.</li>
          <li><b>Vertido de hormigón:</b> Control de vibrado y compactación para lograr la mejor terminación.</li>
          <li><b>Desencofrado y limpieza:</b> Retiro cuidadoso, limpieza y almacenamiento para reutilización.</li>
        </ol>
        <div className="flex justify-center gap-4">
          <img src="/encofrado1.jpg" alt="Proceso 1" className="w-40 h-28 object-cover rounded-xl shadow" />
          <img src="/encofrado2.jpg" alt="Proceso 2" className="w-40 h-28 object-cover rounded-xl shadow" />
          <img src="/encofrado3.jpg" alt="Proceso 3" className="w-40 h-28 object-cover rounded-xl shadow" />
        </div>
      </section>

      {/* GALERÍA DE PROYECTOS */}
      <section className="w-full max-w-5xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Galería de proyectos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/render1.jpg" alt="Proyecto 1" className="w-full h-40 object-cover rounded-xl shadow" />
          <img src="/render2.jpg" alt="Proyecto 2" className="w-full h-40 object-cover rounded-xl shadow" />
          <img src="/render3.jpg" alt="Proyecto 3" className="w-full h-40 object-cover rounded-xl shadow" />
          <img src="/render4.jpg" alt="Proyecto 4" className="w-full h-40 object-cover rounded-xl shadow" />
          <img src="/render5.jpg" alt="Proyecto 5" className="w-full h-40 object-cover rounded-xl shadow" />
        </div>
      </section>
    </main>
  );
}
