"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { saveUserPreference, getUserPreference } from "../../lib/database";

const STYLES = ["Moderno", "Clásico", "Minimalista"];
const MATERIALS = ["Madera", "Hormigón", "Ladrillo", "Mixto"];

export default function DesignCustomizationPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0]);
  const [surface, setSurface] = useState<number>(120);
  const [material, setMaterial] = useState<string>(MATERIALS[0]);
  const [saved, setSaved] = useState<boolean>(false);
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

  useEffect(() => {
    if (user) {
      loadUserPreferences();
    }
  }, [user]);

  const loadUserPreferences = async () => {
    if (!user) return;

    const { data, error } = await getUserPreference(user.id);
    if (!error && data) {
      setSelectedStyle(data.style);
      setSurface(data.surface);
      setMaterial(data.material);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      // Save to database
      const { error } = await saveUserPreference({
        user_id: user.id,
        style: selectedStyle,
        surface: surface,
        material: material,
      });

      if (error) {
        console.error('Error saving preferences:', error);
        alert('Hubo un error al guardar tus preferencias');
        return;
      }
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#034f1d]">
          Personalizá el diseño de tu casa
        </h1>
        <p className="mb-8 text-[#034f1d] text-center">
          Elegí el estilo arquitectónico que más te guste y ajustá la distribución, materiales y terminaciones para que tu casa sea como siempre soñaste.
        </p>
        
        {user && (
          <div className="mb-6 p-4 bg-[#e1f7e3] rounded-lg border border-[#65b305]">
            <p className="text-[#034f1d] text-sm">
              <span className="font-semibold">Sesión iniciada:</span> {user.email}
              <br />
              Tus preferencias se guardan automáticamente.
            </p>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#034f1d]">Estilo arquitectónico</h2>
            <div className="flex gap-4 justify-center">
              {STYLES.map((style) => (
                <button
                  type="button"
                  key={style}
                  className={`px-4 py-2 rounded-lg border transition font-medium focus:outline-none focus:ring-2 focus:ring-[#65b305] ${
                    selectedStyle === style
                      ? "bg-[#65b305] text-white border-[#65b305] shadow"
                      : "bg-[#e1f7e3] text-[#034f1d] border-[#e1f7e3] hover:bg-[#65b305]/10"
                  }`}
                  aria-pressed={selectedStyle === style}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#034f1d]">Distribución y materiales</h2>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="surface-slider">
                  Superficie (m²): <span className="font-bold text-[#65b305]">{surface}</span>
                </label>
                <input
                  id="surface-slider"
                  type="range"
                  min={50}
                  max={300}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="w-full accent-[#65b305]"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#034f1d]" htmlFor="material-select">
                  Material de terminación
                </label>
                <div className="flex gap-3 flex-wrap">
                  {MATERIALS.map((mat) => (
                    <button
                      type="button"
                      key={mat}
                      className={`px-4 py-2 rounded-lg border transition font-medium focus:outline-none focus:ring-2 focus:ring-[#65b305] ${
                        material === mat
                          ? "bg-[#65b305] text-white border-[#65b305] shadow"
                          : "bg-[#e1f7e3] text-[#034f1d] border-[#e1f7e3] hover:bg-[#65b305]/10"
                      }`}
                      aria-pressed={material === mat}
                      onClick={() => setMaterial(mat)}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#65b305] text-white rounded-lg font-semibold shadow hover:bg-[#034f1d] transition"
            >
              {user ? 'Guardar preferencias' : 'Guardar preferencias (sin cuenta)'}
            </button>
          </div>
          {saved && (
            <div className="mt-6 text-center">
              <span className="inline-block bg-[#e1f7e3] text-[#034f1d] px-4 py-2 rounded-lg font-medium shadow border border-[#65b305]">
                {user ? '¡Tus preferencias se guardaron en tu cuenta!' : '¡Preferencias guardadas!'}
              </span>
            </div>
          )}
        </form>
      </section>
    </main>
  );
} 