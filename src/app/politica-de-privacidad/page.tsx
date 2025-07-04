"use client";

import React from "react";

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-4">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-[#034f1d] text-center">Política de Privacidad</h1>
        <p className="mb-4 text-[#034f1d]">
          En Concreviv valoramos y protegemos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal al utilizar nuestro sitio web y servicios.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">1. Información que recopilamos</h2>
        <p className="mb-4 text-[#034f1d]">
          Podemos recopilar datos personales como nombre, correo electrónico, teléfono, zona y comentarios cuando completás formularios de contacto, cotización o consulta en nuestro sitio.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">2. Uso de la información</h2>
        <p className="mb-4 text-[#034f1d]">
          Utilizamos tus datos para responder consultas, enviar cotizaciones, mejorar nuestros servicios y, si lo autorizás, enviarte información comercial relevante. No compartimos tus datos con terceros salvo obligación legal o para la prestación de servicios solicitados.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">3. Seguridad</h2>
        <p className="mb-4 text-[#034f1d]">
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados, alteraciones o divulgación.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">4. Derechos del usuario</h2>
        <p className="mb-4 text-[#034f1d]">
          Podés acceder, rectificar o eliminar tus datos personales en cualquier momento, escribiendo a <a href="mailto:info@concreviv.com" className="text-[#65b305] underline">info@concreviv.com</a>.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">5. Cookies y tecnologías similares</h2>
        <p className="mb-4 text-[#034f1d]">
          Utilizamos cookies para mejorar la experiencia de usuario y analizar el uso del sitio. Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de algunas secciones.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">6. Cambios en la política</h2>
        <p className="mb-4 text-[#034f1d]">
          Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en esta página.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2 text-[#034f1d]">7. Contacto</h2>
        <p className="mb-2 text-[#034f1d]">
          Si tenés dudas sobre nuestra política de privacidad, escribinos a <a href="mailto:info@concreviv.com" className="text-[#65b305] underline">info@concreviv.com</a>.
        </p>
      </section>
    </main>
  );
} 