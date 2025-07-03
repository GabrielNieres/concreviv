"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthWidget() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setShowModal(false);
  };

  const handleLogout = async () => {
    setError(null);
    await supabase.auth.signOut();
  };

  if (loading) return <div className="text-gray-500">Cargando...</div>;

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="text-sm text-[#034f1d] font-medium truncate max-w-[120px]" title={user.email}>{user.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => { setShowModal(true); setError(null); setInfo(null); }}
            className="px-4 py-2 bg-[#65b305] text-white rounded-full font-semibold shadow hover:bg-[#034f1d] transition text-sm"
          >
            Iniciar sesión
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/40">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                <h2 className="text-lg font-bold mb-4 text-[#034f1d]">Acceso para administrador</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    className="border rounded px-3 py-2 focus:outline-[#65b305]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    required
                    placeholder="Contraseña"
                    className="border rounded px-3 py-2 focus:outline-[#65b305]"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button type="submit" className="bg-[#65b305] text-white rounded-lg py-2 font-semibold hover:bg-[#034f1d] transition">
                    Ingresar
                  </button>
                  {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
                  {info && <div className="text-green-600 text-sm mt-1">{info}</div>}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 