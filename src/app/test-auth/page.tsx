"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
    } else {
      setProfile(data);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/test-auth`
      }
    });
    if (error) console.error('Login error:', error);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
    setProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Test de Autenticación</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Estado de Autenticación</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado:</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  user ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user ? 'Autenticado' : 'No autenticado'}
                </span>
              </div>

              {user && (
                <>
                  <div>
                    <span className="font-medium">Email:</span>
                    <div className="text-gray-700 mt-1">{user.email}</div>
                  </div>
                  <div>
                    <span className="font-medium">ID:</span>
                    <div className="text-gray-700 mt-1 font-mono text-sm">{user.id}</div>
                  </div>
                  <div>
                    <span className="font-medium">Proveedor:</span>
                    <div className="text-gray-700 mt-1">{user.app_metadata?.provider || 'N/A'}</div>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                {!user ? (
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Iniciar Sesión
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Cerrar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Perfil de Usuario</h2>
            
            {user ? (
              <div className="space-y-4">
                {profile ? (
                  <div>
                    <div className="text-green-600 font-medium mb-2">✓ Perfil encontrado</div>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Nombre:</span> {profile.full_name || 'N/A'}</div>
                      <div><span className="font-medium">Email:</span> {profile.email}</div>
                      <div><span className="font-medium">Creado:</span> {new Date(profile.created_at).toLocaleDateString('es-AR')}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-yellow-600 font-medium mb-2">⚠ No se encontró perfil</div>
                    <button
                      onClick={createProfile}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Crear Perfil
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Inicia sesión para ver el perfil</div>
            )}
          </div>
        </div>

        {/* Session Details */}
        {session && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles de Sesión</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Test Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Instrucciones de Prueba</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Haz clic en "Iniciar Sesión" para autenticarte con Google</li>
            <li>Verifica que tu email aparezca en el estado de autenticación</li>
            <li>Si no hay perfil, haz clic en "Crear Perfil"</li>
            <li>Prueba el botón "Cerrar Sesión" para verificar el logout</li>
            <li>Navega por otras páginas para verificar que el AuthWidget funciona globalmente</li>
          </ol>
        </div>
      </div>
    </main>
  );
} 