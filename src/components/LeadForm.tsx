import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { createLead } from "../lib/database";

const ZONES = ["Mar del Plata", "Chapadmalal", "Santa Clara", "Balcarce", "Otros"];

export default function LeadForm({ leadType = "consulta" }: { leadType?: string }) {
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

  useEffect(() => {
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
        lead_type: leadType,
      });
      if (error) {
        alert('Error al enviar los datos. Por favor, intenta de nuevo.');
        return;
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setForm({ name: "", email: "", phone: "", zone: ZONES[0], comment: "" });
    } catch (error) {
      alert('Error al enviar los datos. Por favor, intenta de nuevo.');
    }
  };

  if (loading) return <div className="text-center text-[#034f1d]">Cargando...</div>;

  return (
    <>
      {user && (
        <div className="mb-6 p-4 bg-[#e1f7e3] rounded-lg border border-[#65b305]">
          <p className="text-[#034f1d] text-sm">
            <span className="font-semibold">Sesión iniciada:</span> {user.email}
            <br />Tu solicitud se guardará en tu cuenta.
          </p>
        </div>
      )}
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
        <div>
          <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="phone">Teléfono</label>
          <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="zone">Zona</label>
            <select id="zone" name="zone" value={form.zone} onChange={handleChange} className="w-full border border-[#e1f7e3] rounded-lg p-2 bg-[#F9FAFB] text-[#034f1d] focus:border-[#65b305] focus:ring-2 focus:ring-[#65b305]">
              {ZONES.map((zone) => <option key={zone}>{zone}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="comment">Comentario</label>
          <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows={3} className="w-full border border-[#e1f7e3] rounded-lg p-2 focus:ring-2 focus:ring-[#65b305] focus:border-[#65b305] text-[#034f1d] bg-[#F9FAFB]" placeholder="Agregá detalles, dudas o comentarios sobre tu proyecto..." />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-8 py-3 bg-[#65b305] text-white rounded-lg font-semibold shadow hover:bg-[#034f1d] transition">Enviar consulta</button>
        </div>
        {submitted && (
          <div className="mt-6 text-center">
            <span className="inline-block bg-[#e1f7e3] text-[#034f1d] px-4 py-2 rounded-lg font-medium shadow border border-[#65b305]">
              ¡Consulta enviada! Pronto nos pondremos en contacto con vos.
            </span>
          </div>
        )}
      </form>
    </>
  );
} 