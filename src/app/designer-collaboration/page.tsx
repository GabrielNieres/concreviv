"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { createLead } from "../../lib/database";
import LeadForm from "../../components/LeadForm";

const CONSTRUCTION_TYPES = ["Tradicional", "Industrializado", "Mixto"];
const ZONES = ["Mar del Plata", "Chapadmalal", "Santa Clara", "Balcarce", "Otros"];

export default function DesignerCollaborationPage() {
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
      // Save lead to database
      const { error } = await createLead({
        user_id: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        zone: form.zone,
        comment: form.comment,
        lead_type: 'consulta',
      });

      if (error) {
        console.error('Error saving lead:', error);
        alert('Error al enviar los datos. Por favor, intenta de nuevo.');
        return;
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        zone: ZONES[0],
        comment: "",
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar los datos. Por favor, intenta de nuevo.');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8">
        <div className="text-xl">Cargando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#034f1d]">
          Coordiná una consulta con un diseñador
        </h1>
        <p className="mb-8 text-[#034f1d] text-center">
          Completá tus datos y preferencias para que un diseñador se comunique con vos y te ayude a definir tu proyecto.
        </p>
        <LeadForm leadType="consulta" />
      </section>
    </main>
  );
} 