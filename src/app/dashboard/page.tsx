"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../supabaseClient';
import { getLeads, Lead } from '../../lib/database';

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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [leadTypeFilter, setLeadTypeFilter] = useState('');
  const [orderBy, setOrderBy] = useState<'fecha-desc' | 'fecha-asc' | 'tipo'>('fecha-desc');
  const [page, setPage] = useState(1);
  const leadsPerPage = 10;

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const { data: leadsData } = await getLeads();
        setLeads(leadsData || []);
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
      setLoading(false);
      }
    };
    loadLeads();
  }, []);

  // Tipos de lead únicos para el filtro
  const leadTypes = useMemo(() => {
    const types = Array.from(new Set(leads.map(l => l.lead_type).filter(Boolean)));
    return types;
  }, [leads]);

  // Leads filtrados y ordenados
  const filteredLeads = useMemo(() => {
    let result = leads;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(l =>
        (l.name?.toLowerCase().includes(s) ||
         l.email?.toLowerCase().includes(s) ||
         l.zone?.toLowerCase().includes(s) ||
         l.comment?.toLowerCase().includes(s))
      );
    }
    if (leadTypeFilter) {
      result = result.filter(l => l.lead_type === leadTypeFilter);
    }
    if (orderBy === 'fecha-desc') {
      result = [...result].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
    } else if (orderBy === 'fecha-asc') {
      result = [...result].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    } else if (orderBy === 'tipo') {
      result = [...result].sort((a, b) => (a.lead_type || '').localeCompare(b.lead_type || ''));
    }
    return result;
  }, [leads, search, leadTypeFilter, orderBy]);

  // Paginación
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice((page - 1) * leadsPerPage, page * leadsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-full 2xl:max-w-screen-2xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#034f1d]">Mi panel</h1>
        </div>

        {/* Leads Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-[#034f1d]">Mis consultas</h2>
            {/* Filtros y buscador */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
              <input
                type="text"
                placeholder="Buscar por nombre, email, zona o comentario..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-[#e1f7e3] rounded-lg p-2 min-w-[220px] bg-[#F9FAFB] text-[#034f1d] focus:border-[#65b305] focus:ring-2 focus:ring-[#65b305]"
              />
              <select
                value={leadTypeFilter}
                onChange={e => setLeadTypeFilter(e.target.value)}
                className="border border-[#e1f7e3] rounded-lg p-2 bg-[#F9FAFB] text-[#034f1d] focus:border-[#65b305] focus:ring-2 focus:ring-[#65b305]"
              >
                <option value="">Tipo de lead (todos)</option>
                {leadTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <select
                value={orderBy}
                onChange={e => setOrderBy(e.target.value as any)}
                className="border border-[#e1f7e3] rounded-lg p-2 bg-[#F9FAFB] text-[#034f1d] focus:border-[#65b305] focus:ring-2 focus:ring-[#65b305]"
              >
                <option value="fecha-desc">Más recientes primero</option>
                <option value="fecha-asc">Más antiguos primero</option>
                <option value="tipo">Ordenar por tipo de lead</option>
              </select>
            </div>
            {paginatedLeads.length > 0 ? (
              <div className="overflow-x-auto w-full">
                <table className="min-w-full w-full border border-[#e1f7e3] rounded-lg bg-white">
                  <thead>
                    <tr className="bg-[#e1f7e3] text-[#034f1d]">
                      <th className="px-3 py-2 text-left font-semibold">Nombre</th>
                      <th className="px-3 py-2 text-left font-semibold">Email</th>
                      <th className="px-3 py-2 text-left font-semibold">Teléfono</th>
                      <th className="px-3 py-2 text-left font-semibold">Zona</th>
                      <th className="px-3 py-2 text-left font-semibold">Comentario</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo de lead</th>
                      <th className="px-3 py-2 text-left font-semibold">Paquete</th>
                      <th className="px-3 py-2 text-left font-semibold">Información extra</th>
                      <th className="px-3 py-2 text-left font-semibold">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-[#e1f7e3] hover:bg-[#f6fff7]">
                        <td className="px-3 py-2">{lead.name}</td>
                        <td className="px-3 py-2">{lead.email}</td>
                        <td className="px-3 py-2">{lead.phone}</td>
                        <td className="px-3 py-2">{lead.zone || '-'}</td>
                        <td className="px-3 py-2 max-w-xs truncate" title={lead.comment}>{lead.comment || '-'}</td>
                        <td className="px-3 py-2">{lead.lead_type || '-'}</td>
                        <td className="px-3 py-2">{lead.package_type || '-'}</td>
                        <td className="px-3 py-2">
                          {lead.extra_info ? (
                            <pre className="whitespace-pre-wrap text-xs text-[#034f1d] bg-[#f6fff7] rounded p-2 max-w-xs overflow-x-auto">{lead.extra_info}</pre>
                          ) : '-'}
                        </td>
                        <td className="px-3 py-2">{lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-AR') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Paginación */}
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-[#e1f7e3] text-[#034f1d] font-bold disabled:opacity-50">Anterior</button>
                  <span className="mx-2 text-[#034f1d]">Página {page} de {totalPages}</span>
                  <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-[#e1f7e3] text-[#034f1d] font-bold disabled:opacity-50">Siguiente</button>
                </div>
              </div>
            ) : (
              <div className="text-[#034f1d]">No tenés consultas registradas.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 