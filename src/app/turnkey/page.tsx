"use client";

import React, { useState } from "react";
import { createLead } from "../../lib/database";
import { supabase } from "../../supabaseClient";

const TURNKEY_PACKAGES = [
  {
    id: 1,
    name: "Paquete Básico",
    description: "Casa completamente terminada lista para mudarse",
    price: "$180,000",
    features: [
      "Instalaciones eléctricas completas",
      "Plomería terminada",
      "Pisos y paredes acabados",
      "Cocina equipada",
      "Baños completos",
      "Iluminación incluida",
    ],
    materials: [
      "Pisos de cerámica",
      "Pintura interior y exterior",
      "Puertas y ventanas",
      "Grifería estándar",
    ],
    image: "/render3a.jpg",
  },
  {
    id: 2,
    name: "Paquete Premium",
    description: "Casa de lujo con acabados superiores",
    price: "$250,000",
    features: [
      "Todo del paquete básico",
      "Acabados de lujo",
      "Sistema de seguridad",
      "Climatización central",
      "Jardín paisajístico",
      "Cochera automática",
    ],
    materials: [
      "Pisos de madera noble",
      "Pintura premium",
      "Grifería de diseño",
      "Electrodomésticos de alta gama",
    ],
    image: "/header.jpg",
  },
  {
    id: 3,
    name: "Paquete Personalizado",
    description: "Casa a medida con tus especificaciones",
    price: "Consultar",
    features: [
      "Diseño personalizado",
      "Materiales a elección",
      "Tecnología smart home",
      "Piscina incluida",
      "Sala de entretenimiento",
      "Oficina en casa",
    ],
    materials: [
      "Materiales premium a elección",
      "Tecnología integrada",
      "Acabados personalizados",
      "Mobiliario incluido",
    ],
    image: "/agenda.png",
  },
];

const QUALITY_STANDARDS = [
  "Certificación ISO 9001",
  "Garantía de 10 años",
  "Inspección de calidad en cada etapa",
  "Materiales certificados",
  "Equipo profesional certificado",
  "Cumplimiento de normas de construcción",
];

const ZONES = ["Mar del Plata", "Chapadmalal", "Santa Clara", "Balcarce", "Otros"];

export default function TurnkeyPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zone: ZONES[0],
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<typeof TURNKEY_PACKAGES[0] | null>(null);

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    try {
      const { error } = await createLead({
        user_id: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        zone: form.zone,
        comment: form.comment,
        lead_type: 'turnkey',
        package_type: selectedPackage.name,
        extra_info: JSON.stringify({
          features: selectedPackage.features,
          materials: selectedPackage.materials,
        }),
      });
      if (error) {
        alert('Error al enviar los datos. Por favor, intenta de nuevo.');
        return;
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setForm({ name: "", email: "", phone: "", zone: ZONES[0], comment: "" });
      setShowModal(false);
    } catch (error) {
      alert('Error al enviar los datos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-[#034f1d]">
            Entrega llave en mano
          </h1>
          <p className="text-xl text-[#034f1d] max-w-3xl mx-auto">
            Tu casa completamente terminada y lista para mudarte. Nos ocupamos de todo, desde la construcción hasta los últimos detalles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {TURNKEY_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-[#e1f7e3] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#65b305]/30">
              <div className="h-48 bg-white overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-[#034f1d]">{pkg.name}</h2>
                <p className="text-[#034f1d] mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-[#65b305] mb-6">{pkg.price}</div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-[#034f1d]">Incluye:</h3>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-[#034f1d]">
                        <span className="text-[#65b305] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-[#034f1d]">Materiales:</h3>
                  <ul className="space-y-2">
                    {pkg.materials.map((material, index) => (
                      <li key={index} className="flex items-center text-[#034f1d]">
                        <span className="text-[#65b305] mr-2">•</span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="w-full bg-[#65b305] text-white py-3 rounded-lg font-semibold hover:bg-[#034f1d] transition"
                  onClick={() => { setSelectedPackage(pkg); setShowModal(true); }}
                  type="button"
                >
                  Pedir cotización
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#034f1d]">
            Estándares de calidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_STANDARDS.map((standard, index) => (
              <div key={index} className="flex items-center p-4 bg-[#e1f7e3] rounded-lg border border-[#65b305]/30">
                <span className="text-[#65b305] mr-3 text-xl">🏆</span>
                <span className="font-medium text-[#034f1d]">{standard}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#65b305] to-[#034f1d] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Por qué elegir llave en mano?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-2">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Listo para mudarse</h3>
              <p>Tu casa completamente terminada, solo trae tus muebles.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Sin sorpresas</h3>
              <p>Precio fijo, sin costos adicionales ni retrasos.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Garantía total</h3>
              <p>10 años de garantía en construcción y acabados.</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-[#034f1d] text-center">Solicitar cotización llave en mano</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="name">Nombre y apellido</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="phone">Teléfono</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="zone">Zona</label>
                  <select id="zone" name="zone" value={form.zone} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 bg-[#F9FAFB] text-[#034f1d] focus:border-[#65b305] focus:ring-2 focus:ring-[#65b305]">
                    {ZONES.map((zone) => (
                      <option key={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="comment">Comentario</label>
                <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows={3} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" placeholder="Agregá detalles, dudas o comentarios sobre tu proyecto..." />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="px-8 py-3 bg-[#65b305] text-white rounded-lg font-semibold shadow hover:bg-[#034f1d] transition">Enviar cotización</button>
              </div>
              {submitted && (
                <div className="mt-6 text-center">
                  <span className="inline-block bg-[#e1f7e3] text-[#034f1d] px-4 py-2 rounded-lg font-medium shadow border border-[#65b305]">¡Cotización enviada! Pronto nos pondremos en contacto con vos.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
} 