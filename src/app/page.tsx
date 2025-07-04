"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "Diseño", href: "/design-customization" },
  { name: "Modelos", href: "/pre-established-models" },
  { name: "Calculadora de costos", href: "/cost-calculator" },
  { name: "Agendar consulta", href: "/designer-collaboration" },
  { name: "Llave en mano", href: "/turnkey" },
  { name: "Precios", href: "/pricing" },
];

const carouselImages = [
  { src: "/header.jpg", alt: "Casa moderna de hormigón" },
  { src: "/render5a.jpg", alt: "Render de vivienda 5A" },
  { src: "/render3a.jpg", alt: "Render de vivienda 3A" },
  // Agregá más imágenes acá
];

function Carrusel() {
  const [current, setCurrent] = useState(0);
  const length = carouselImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const goTo = (idx: number) => setCurrent(idx);
  // const prev = () => setCurrent((prev) => (prev - 1 + length) % length);
  // const next = () => setCurrent((prev) => (prev + 1) % length);

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-12 mt-4 overflow-x-hidden">
      <div className="overflow-hidden rounded-none shadow-lg w-full h-[500px] md:h-[600px]">
        {carouselImages.map((img, idx) => (
          <div
            key={img.src}
            className={`transition-opacity duration-700 ease-in-out absolute w-full h-[500px] md:h-[600px] ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={idx !== current}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority={idx === 0}
            />
          </div>
        ))}
        <div className="relative w-full h-[500px] md:h-[600px]"></div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Ir a la imagen ${idx + 1}`}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#65b305]' : 'bg-[#e1f7e3]'} border border-[#65b305] transition-colors`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#034f1d] font-[Inter,sans-serif] flex flex-col">
      {/* CARRUSEL DE IMÁGENES */}
      <Carrusel />

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24 bg-[#F9FAFB]">
        <h1 className="text-[32px] md:text-[40px] font-bold mb-4 text-[#034f1d]" style={{ fontFamily: 'Inter, sans-serif' }}>
          ¡Construí tu casa soñada, rápido y accesible con <span className="text-[#65b305]">CONCREVIV</span>!
        </h1>
        <p className="text-[18px] md:text-[20px] max-w-2xl mb-8 text-[#034f1d]" style={{ fontFamily: 'Inter, sans-serif' }}>
          CONCREVIV busca revolucionar la construcción de viviendas en Argentina, ofreciendo casas duraderas y de alta calidad, listas en tiempo récord y a un precio accesible. Utilizamos encofrados metálicos innovadores, hormigón y una variedad de configuraciones para que cada familia pueda cumplir el sueño de la casa propia.
        </p>
      </section>

      {/* PLACEHOLDER FOR FUTURE COMPONENTS */}
      <section className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <Link href="/pre-established-models" className="w-full" aria-label="Ver modelos">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/render1.jpg"
                alt="Render de modelo de vivienda 1"
                width={426}
                height={240}
                className="rounded-lg shadow mb-6 object-contain w-full h-auto max-h-60 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Modelos</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Explorá y elegí entre nuestros modelos de vivienda optimizados.</p>
            </div>
          </Link>
          <Link href="/pricing" className="w-full" aria-label="Ir a Precios">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/render5a.jpg"
                alt="Precios"
                width={426}
                height={240}
                className="rounded-lg shadow mb-6 object-contain w-full h-auto max-h-60 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Precios</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Consultá los precios actualizados y calculá el costo de tu vivienda según tus necesidades.</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <Link href="/turnkey" className="w-full" aria-label="Ir a Llave en mano">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/render3a.jpg"
                alt="Llave en mano"
                width={426}
                height={240}
                className="rounded-lg shadow mb-6 object-contain w-full h-auto max-h-60 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Llave en mano</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Descubrí nuestro servicio integral: nos encargamos de todo para que recibas tu casa lista para habitar.</p>
            </div>
          </Link>
          <Link href="/designer-collaboration" className="w-full" aria-label="Agendar consulta">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/agenda.png"
                alt="Agenda para agendar consulta"
                width={426}
                height={240}
                className="rounded-lg shadow mb-6 object-contain w-full h-auto max-h-60 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Agendar consulta</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Coordiná una consulta con nuestro equipo para tu proyecto.</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <Link href="/conocer-el-sistema" className="w-full" aria-label="Conocer el sistema">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/encofrado4.jpg"
                alt="Conocer el sistema"
                width={426}
                height={240}
                className="rounded-lg shadow mb-6 object-contain w-full h-auto max-h-60 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Conocer el sistema</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Descubrí cómo funciona el sistema de encofrados de acero industrializados de Concreviv y sus ventajas.</p>
            </div>
          </Link>
          <Link href="/quienes-somos" className="w-full" aria-label="Quiénes somos">
            <div className="bg-[#e1f7e3] rounded-lg p-8 shadow flex flex-col items-center transition hover:shadow-xl active:scale-[0.98] cursor-pointer" style={{ maxWidth: '480px', width: '100%' }}>
              <Image
                src="/logo1.png"
                alt="Quiénes somos"
                width={200}
                height={200}
                className="rounded-full shadow mb-6 object-contain w-40 h-40 hover:scale-105 transition-transform duration-200 bg-white"
                style={{ background: '#fff' }}
              />
              <span className="text-[#65b305] text-[32px] font-bold mb-3">Quiénes somos</span>
              <p className="text-[18px] text-[#034f1d] mb-2">Conocé al equipo, la historia y los valores de Concreviv, y descubrí nuestras obras y misión.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
