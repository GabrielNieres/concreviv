"use client";
import { useRouter, useParams } from "next/navigation";
import { MODELS, ordenarCaracteristicas } from "../models-data";
import { FaBed, FaBath, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import React, { useState } from "react";
import { createLead } from "../../../../src/lib/database";
import { supabase } from "../../../../src/supabaseClient";

const ZONES = ["Mar del Plata", "Chapadmalal", "Santa Clara", "Balcarce", "Otros"];

export default function ModeloDetallePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  type ModeloExtendido = typeof MODELS[0] & {
    superficies?: {
      cubierta: number;
      semicubierta: number;
      descubierta: number;
      total_cubierta: number;
      total_semicubierta: number;
      total_descubierta: number;
    };
    ambientes?: Array<{ nombre: string; superficie: number | null; medidas: string | null }>;
    nota?: string;
    obra?: string;
    plano?: string;
  };
  const model = MODELS.find((m) => m.id === id) as ModeloExtendido | undefined;

  // Extraer dormitorios y baños de features
  const dormitorios = model?.features.find(f => f.toLowerCase().includes("dormitorio"))?.match(/\d+/)?.[0] || "-";
  const baños = model?.features.find(f => f.toLowerCase().includes("baño"))?.match(/\d+/)?.[0] || "-";

  // Carrusel de renders
  const [renderIdx, setRenderIdx] = useState(0);
  const renders = model?.images || [];

  // Modal de plano
  const [planoModal, setPlanoModal] = useState<null | string>(null);
  const planoPrincipal = model?.planos[0];

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
    try {
      const { error } = await createLead({
        user_id: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        zone: form.zone,
        comment: form.comment,
        lead_type: 'pre-established-models',
        package_type: model?.name ?? "",
        extra_info: JSON.stringify({
          model_id: model?.id ?? "",
          model_name: model?.name ?? "",
          superficies: model?.superficies ?? null,
          ambientes: model?.ambientes ?? null,
          features: model?.features ?? null,
          description: model?.description ?? "",
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

  if (!model) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Modelo no encontrado</h2>
        <button
          className="px-6 py-2 bg-[#65b305] text-white rounded-lg font-semibold shadow hover:bg-[#034f1d] transition"
          onClick={() => router.push("/pre-established-models")}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-8">
      {/* HERO CARRUSEL */}
      <div className="relative w-full max-w-4xl mb-10 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow hover:bg-[#e1f7e3]"
            onClick={() => setRenderIdx((prev) => (prev === 0 ? renders.length - 1 : prev - 1))}
            aria-label="Anterior"
          >
            <FaChevronLeft size={28} />
          </button>
          <img
            src={renders[renderIdx]}
            alt={`Render ${renderIdx + 1} de ${model.name}`}
            className="w-full max-h-[800px] min-h-[400px] object-cover rounded-3xl shadow-2xl"
            style={{ maxWidth: '1100px' }}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow hover:bg-[#e1f7e3]"
            onClick={() => setRenderIdx((prev) => (prev === renders.length - 1 ? 0 : prev + 1))}
            aria-label="Siguiente"
          >
            <FaChevronRight size={28} />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {renders.map((img, idx) => (
            <button
              key={img}
              className={`w-4 h-4 rounded-full border-2 ${idx === renderIdx ? 'bg-[#65b305] border-[#034f1d]' : 'bg-white border-[#65b305]'}`}
              onClick={() => setRenderIdx(idx)}
              aria-label={`Ver render ${idx + 1}`}
            />
          ))}
        </div>
        <div className="absolute bottom-8 left-8 bg-black/40 rounded-xl px-6 py-4 flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold text-white drop-shadow">{model.name}</h1>
          <div className="flex gap-4 mt-2">
            <span className="bg-[#e1f7e3] text-[#034f1d] px-4 py-1 rounded-full text-lg font-semibold flex items-center gap-2">
              <FaBed /> {dormitorios} Dormitorios
            </span>
            <span className="bg-[#e1f7e3] text-[#034f1d] px-4 py-1 rounded-full text-lg font-semibold flex items-center gap-2">
              <FaBath /> {baños} Baños
            </span>
          </div>
        </div>
        {/* Botón de cotización abajo a la derecha, superpuesto */}
        <button
          className="absolute bottom-8 right-8 px-8 py-3 bg-gradient-to-r from-[#65b305] to-[#034f1d] text-white rounded-xl font-bold shadow-lg hover:from-[#034f1d] hover:to-[#65b305] transition text-lg"
          onClick={() => setShowModal(true)}
        >
          Solicitar cotización
        </button>
      </div>

      {/* VIDEO */}
      {model.video && (
        <div className="w-full max-w-4xl mb-8 rounded-xl overflow-hidden shadow-lg border border-[#65b305]/30 flex justify-center">
          {model.video.includes('facebook.com') ? (
            <iframe
              src={model.video.replace('/videos/', '/video/embed?video_id=')}
              width="900"
              height="400"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full max-w-4xl rounded-xl"
              title={`Video de ${model.name}`}
            />
          ) : (
            <iframe
              width="900"
              height="400"
              src={model.video}
              title={`Video de ${model.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full max-w-4xl rounded-xl"
            />
          )}
        </div>
      )}

      {/* PLANO PRINCIPAL GRANDE */}
      {planoPrincipal && (
        <div className="w-full max-w-4xl mb-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-[#034f1d]">Plano principal</h2>
          <div className="relative w-full flex justify-center">
            <img
              src={planoPrincipal}
              alt={`Plano principal de ${model.name}`}
              className="w-full max-h-[700px] object-contain rounded-2xl shadow-xl cursor-zoom-in border-2 border-[#65b305]"
              style={{ maxWidth: '900px' }}
              onClick={() => setPlanoModal(planoPrincipal)}
            />
            <button
              className="absolute bottom-4 right-4 bg-white/80 rounded-full p-3 shadow hover:bg-[#e1f7e3] flex items-center gap-2"
              onClick={() => setPlanoModal(planoPrincipal)}
              aria-label="Ampliar plano"
            >
              <FaExpand /> <span className="hidden md:inline">Ver grande</span>
            </button>
          </div>
        </div>
      )}

      {/* DESCRIPCIÓN Y CARACTERÍSTICAS */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-2 text-[#034f1d]">Descripción</h2>
        <p className="text-[#4b6358] mb-4 text-lg">{model.description}</p>
        {/* Tabla de superficies */}
        {model.superficies && (
          <div className="overflow-x-auto mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#034f1d]">Superficies</h3>
            <table className="min-w-[400px] w-full border border-[#65b305] rounded-xl text-sm">
              <thead className="bg-[#e1f7e3] text-[#034f1d]">
                <tr>
                  <th className="p-2 font-bold"> </th>
                  <th className="p-2 font-bold">Cubierta (m²)</th>
                  <th className="p-2 font-bold">Semicubierta (m²)</th>
                  <th className="p-2 font-bold">Descubierta (m²)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="p-2">Inicial</td>
                  <td className="p-2">{model.superficies.cubierta}</td>
                  <td className="p-2">{model.superficies.semicubierta}</td>
                  <td className="p-2">{model.superficies.descubierta}</td>
                </tr>
                <tr className="font-semibold bg-[#f6fef7]">
                  <td className="p-2">Total</td>
                  <td className="p-2">{model.superficies.total_cubierta}</td>
                  <td className="p-2">{model.superficies.total_semicubierta}</td>
                  <td className="p-2">{model.superficies.total_descubierta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/* Lista de ambientes */}
        {model.ambientes && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#034f1d]">Ambientes y medidas</h3>
            <table className="min-w-[300px] w-full border border-[#65b305] rounded-xl text-sm">
              <thead className="bg-[#e1f7e3] text-[#034f1d]">
                <tr>
                  <th className="p-2 font-bold">Ambiente</th>
                  <th className="p-2 font-bold">Superficie (m²)</th>
                  <th className="p-2 font-bold">Medidas (m)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {model.ambientes.map((amb, idx) => (
                  <tr key={amb.nombre + idx}>
                    <td className="p-2">{amb.nombre}</td>
                    <td className="p-2">{amb.superficie !== null ? amb.superficie : '-'}</td>
                    <td className="p-2">{amb.medidas || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Características */}
        <h3 className="text-xl font-semibold mb-2 text-[#034f1d]">Características</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {ordenarCaracteristicas(model.features).map((f, i) => (
            <li key={i} className="flex items-center bg-[#f6fef7] rounded-lg px-3 py-2 shadow-sm text-[#034f1d] text-base font-medium">
              {f.icon}{f.text}
            </li>
          ))}
        </ul>
        {/* Notas y datos de obra/plano */}
        {(model.nota || model.obra || model.plano) && (
          <div className="bg-[#e1f7e3] border-l-4 border-[#65b305] p-4 rounded-xl text-[#034f1d] mb-2">
            {model.nota && <div className="mb-1"><span className="font-bold">Nota:</span> {model.nota}</div>}
            {model.obra && <div className="mb-1"><span className="font-bold">Obra:</span> {model.obra}</div>}
            {model.plano && <div><span className="font-bold">Plano:</span> {model.plano}</div>}
          </div>
        )}
      </div>

      {/* Botones de acción al final */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-4xl">
        <button
          className="px-8 py-3 bg-white text-[#034f1d] border-2 border-[#65b305] rounded-xl font-bold shadow-lg hover:bg-[#e1f7e3] transition text-lg"
          onClick={() => router.push("/pre-established-models")}
        >
          Volver
        </button>
        <button
          className="px-8 py-3 bg-gradient-to-r from-[#65b305] to-[#034f1d] text-white rounded-xl font-bold shadow-lg hover:from-[#034f1d] hover:to-[#65b305] transition text-lg"
          onClick={() => setShowModal(true)}
        >
          Solicitar cotización
        </button>
      </div>

      {/* MODAL DE PLANO FULLSCREEN */}
      {planoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setPlanoModal(null)}>
          <img
            src={planoModal}
            alt="Plano ampliado"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl border-4 border-[#65b305] bg-white"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-8 right-8 px-6 py-2 bg-[#65b305] text-white rounded-lg font-bold shadow-lg hover:bg-[#034f1d] transition text-lg"
            onClick={() => setPlanoModal(null)}
          >
            Cerrar
          </button>
        </div>
      )}

      {/* MODAL DE COTIZACIÓN */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-[#034f1d] text-center">Solicitar cotización</h2>
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