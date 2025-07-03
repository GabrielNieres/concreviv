"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { getProfile, getUserPreference, getLeads, Lead } from '../../lib/database';

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface UserPreference {
  id: string;
  user_id: string;
  style: string;
  surface: number;
  material: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
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
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load profile
      const { data: profileData } = await getProfile(user.id);
      setProfile(profileData);

      // Load preferences
      const { data: preferencesData } = await getUserPreference(user.id);
      setPreferences(preferencesData);

      // Load leads
      const { data: leadsData } = await getLeads(user.id);
      setLeads(leadsData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#034f1d]">Acceso requerido</h1>
          <p className="text-[#034f1d] mb-4">Tenés que iniciar sesión para ver tu panel.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-[#65b305] text-white rounded-lg font-semibold hover:bg-[#034f1d] transition"
          >
            Ir al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#034f1d]">Mi panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#034f1d]">Mi perfil</h2>
              {profile ? (
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-[#034f1d]">Email:</span>
                    <div className="text-[#034f1d]">{profile.email}</div>
                  </div>
                  <div>
                    <span className="font-medium text-[#034f1d]">Nombre:</span>
                    <div className="text-[#034f1d]">{profile.full_name || 'No especificado'}</div>
                  </div>
                  <div>
                    <span className="font-medium text-[#034f1d]">Miembro desde:</span>
                    <div className="text-[#034f1d]">{new Date(profile.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ) : (
                <div className="text-[#034f1d]">Cargando perfil...</div>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#034f1d]">Mis preferencias de diseño</h2>
              {preferences ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#e1f7e3] rounded-lg">
                    <div className="font-medium text-[#65b305]">Estilo</div>
                    <div className="text-[#034f1d]">{preferences.style}</div>
                  </div>
                  <div className="p-4 bg-[#e1f7e3] rounded-lg">
                    <div className="font-medium text-[#65b305]">Superficie</div>
                    <div className="text-[#034f1d]">{preferences.surface} m²</div>
                  </div>
                  <div className="p-4 bg-[#e1f7e3] rounded-lg">
                    <div className="font-medium text-[#65b305]">Material</div>
                    <div className="text-[#034f1d]">{preferences.material}</div>
                  </div>
                </div>
              ) : (
                <div className="text-[#034f1d]">
                  No tienes preferencias guardadas. 
                  <a href="/design-customization" className="text-[#65b305] hover:text-[#034f1d] ml-1">
                    Crear preferencias
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leads Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#034f1d]">Mis consultas</h2>
            {leads.length > 0 ? (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="border border-[#e1f7e3] rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[#034f1d]">{lead.name}</h3>
                        <p className="text-[#034f1d]">{lead.email} • {lead.phone}</p>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div><span className="font-medium">Zona:</span> {lead.zone || '-'}</div>
                          <div><span className="font-medium">Comentario:</span> {lead.comment || '-'}</div>
                          <div><span className="font-medium">Tipo de lead:</span> {lead.lead_type || '-'}</div>
                        </div>
                      </div>
                      <div className="text-xs text-[#034f1d] text-right">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[#034f1d]">No tenés consultas registradas.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/design-customization"
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
              >
                <div className="text-blue-800 font-medium">Personalizar Diseño</div>
                <div className="text-blue-600 text-sm">Actualizar preferencias</div>
              </a>
              <a
                href="/designer-collaboration"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
              >
                <div className="text-green-800 font-medium">Contactar Diseñador</div>
                <div className="text-green-600 text-sm">Nueva solicitud</div>
              </a>
              <a
                href="/pre-established-models"
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
              >
                <div className="text-purple-800 font-medium">Ver Modelos</div>
                <div className="text-purple-600 text-sm">Explorar opciones</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 