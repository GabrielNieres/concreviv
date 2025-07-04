import { supabase } from '../supabaseClient';

export interface Lead {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  // Campos antiguos (puedes eliminarlos si ya no se usan)
  construction_type?: string;
  style?: string;
  surface?: number;
  material?: string;
  // Nuevos campos
  zone?: string;
  comment?: string;
  lead_type?: string;
  created_at?: string;
  package_type?: string;
  features?: string;
  materials?: string;
  extra_info?: string;
}

export const createLead = async (lead: Omit<Lead, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();
  return { data, error };
};

export const getLeads = async (userId?: string) => {
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query;
  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const getUserPreference = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const saveUserPreference = async (preference: any) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert([preference])
    .select()
    .single();
  return { data, error };
}; 