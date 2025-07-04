"use client";

import React from "react";

const obras = [
  {
    nombre: "Edificio Horizonte",
    descripcion: "Torre residencial de hormigón visto en Mar del Plata.",
    imagen: "/hormigon-visto1.jpg",
  },
  {
    nombre: "Casa Lago",
    descripcion: "Vivienda unifamiliar con diseño contemporáneo y hormigón expuesto.",
    imagen: "/hormigon-visto2.jpg",
  },
  {
    nombre: "Complejo Sustentable Sur",
    descripcion: "Conjunto de viviendas sustentables con estructura de hormigón.",
    imagen: "/hormigon-visto3.jpg",
  },
];

const sistemaEjemplo = {
  titulo: "Sistema Concreviv aplicado",
  descripcion: "El sistema Concreviv utiliza encofrados industrializados para lograr rapidez, calidad y terminaciones de hormigón visto. Permite optimizar tiempos y costos, garantizando eficiencia y durabilidad.",
  imagenes: ["/encofrado1.jpg", "/encofrado2.jpg"],
};

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-4">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h1 className="text-4xl font-extrabold mb-6 text-[#034f1d] text-center">Quiénes somos</h1>
        <p className="text-lg text-[#034f1d] mb-6 text-center">
          Concreviv es una empresa argentina dedicada a transformar la construcción de viviendas mediante sistemas industrializados, priorizando la calidad, la sustentabilidad y la satisfacción del cliente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#e1f7e3] rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-[#034f1d] mb-2">Misión</h2>
            <p className="text-[#034f1d]">Transformar la construcción de viviendas en Argentina, brindando soluciones innovadoras, rápidas y accesibles para todos.</p>
          </div>
          <div className="bg-[#e1f7e3] rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-[#034f1d] mb-2">Visión</h2>
            <p className="text-[#034f1d]">Ser referentes en sistemas constructivos industrializados, priorizando la calidad, la sustentabilidad y la satisfacción del cliente.</p>
          </div>
        </div>
      </section>

      {/* Perfil del arquitecto principal */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10 flex flex-col md:flex-row gap-8 items-center">
        <img src="/arquitecto.png" alt="Arq. Juan Pérez" className="w-40 h-40 object-cover rounded-full border-4 border-[#65b305] shadow-lg mb-4 md:mb-0" />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-[#034f1d] mb-2">Arq. Juan Pérez</h2>
          <p className="text-[#034f1d] mb-2 font-semibold">Fundador y Director de Concreviv</p>
          <p className="text-[#034f1d] mb-2">Universidad Nacional de Mar del Plata<br/>Posgrado en Construcción Industrializada (UBA)</p>
          <p className="text-[#034f1d] mb-2">20 años liderando proyectos de vivienda, obras públicas y desarrollos sustentables.</p>
          <p className="text-[#034f1d]">Especialista en sistemas de hormigón visto y construcción eficiente.</p>
        </div>
      </section>

      {/* Obras importantes */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Obras lideradas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {obras.map((obra) => (
            <div key={obra.nombre} className="flex flex-col items-center bg-[#f6fef7] rounded-xl p-4 shadow">
              <img src={obra.imagen} alt={obra.nombre} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h4 className="text-lg font-bold text-[#034f1d] mb-1">{obra.nombre}</h4>
              <p className="text-[#034f1d] text-sm text-center">{obra.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sistema aplicado */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">{sistemaEjemplo.titulo}</h3>
        <p className="text-[#034f1d] mb-6 text-center">{sistemaEjemplo.descripcion}</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {sistemaEjemplo.imagenes.map((img, idx) => (
            <img key={idx} src={img} alt={`Encofrado ${idx + 1}`} className="w-full md:w-72 h-48 object-cover rounded-lg shadow" />
          ))}
        </div>
      </section>

      {/* Perfiles secundarios */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src="/ingeniera.png" alt="Ing. María López" className="w-28 h-28 object-cover rounded-full border-2 border-[#65b305] shadow mb-2" />
            <h4 className="font-bold text-[#034f1d]">Ing. María López</h4>
            <p className="text-[#034f1d] text-sm text-center">Ingeniera Civil, especialista en estructuras y eficiencia energética.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/licenciado.png" alt="Lic. Pablo Gómez" className="w-28 h-28 object-cover rounded-full border-2 border-[#65b305] shadow mb-2" />
            <h4 className="font-bold text-[#034f1d]">Lic. Pablo Gómez</h4>
            <p className="text-[#034f1d] text-sm text-center">Licenciado en Administración, gestión de proyectos y finanzas.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/abogado.png" alt="Dr. Luis Fernández" className="w-28 h-28 object-cover rounded-full border-2 border-[#65b305] shadow mb-2" />
            <h4 className="font-bold text-[#034f1d]">Dr. Luis Fernández</h4>
            <p className="text-[#034f1d] text-sm text-center">Abogado, especialista en derecho urbanístico y contratos.</p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Nuestros valores</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <li className="bg-[#e1f7e3] rounded-xl p-6 shadow font-semibold text-[#034f1d]">Calidad y excelencia</li>
          <li className="bg-[#e1f7e3] rounded-xl p-6 shadow font-semibold text-[#034f1d]">Innovación y eficiencia</li>
          <li className="bg-[#e1f7e3] rounded-xl p-6 shadow font-semibold text-[#034f1d]">Compromiso y transparencia</li>
        </ul>
      </section>

      {/* Historia */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-6 text-center">Nuestra historia</h3>
        <p className="text-[#034f1d] text-lg text-center">
          Concreviv nació en Mar del Plata en 2018, fruto de la visión de un equipo multidisciplinario apasionado por la arquitectura, la ingeniería y la innovación. Desde entonces, hemos liderado proyectos de vivienda y obras públicas, siempre apostando por la industrialización y la sustentabilidad en la construcción.
        </p>
      </section>

      {/* Contacto directo */}
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-10 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-[#034f1d] mb-4 text-center">Contacto directo</h3>
        <p className="text-[#034f1d] mb-2">¿Querés saber más sobre nuestro equipo o proyectos?</p>
        <a href="mailto:info@concreviv.com" className="px-8 py-3 bg-gradient-to-r from-[#65b305] to-[#034f1d] text-white rounded-xl font-bold shadow-lg hover:from-[#034f1d] hover:to-[#65b305] transition text-lg">Escribinos</a>
      </section>
    </main>
  );
} 