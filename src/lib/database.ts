import { supabase } from '../supabaseClient';

// Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  construction_type: string;
  style: string;
  surface: number;
  material: string;
  created_at?: string;
}

export interface UserPreference {
  id?: string;
  user_id: string;
  style: string;
  surface: number;
  material: string;
  created_at?: string;
  updated_at?: string;
}

// Profile operations
export const createProfile = async (profile: Omit<Profile, 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();
  
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

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

// Lead operations
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

export const getLead = async (leadId: string) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();
  
  return { data, error };
};

// User preferences operations
export const saveUserPreference = async (preference: Omit<UserPreference, 'id' | 'created_at' | 'updated_at'>) => {
  // Check if preference already exists
  const { data: existing } = await supabase
    .from('user_preferences')
    .select('id')
    .eq('user_id', preference.user_id)
    .single();

  if (existing) {
    // Update existing preference
    const { data, error } = await supabase
      .from('user_preferences')
      .update({
        style: preference.style,
        surface: preference.surface,
        material: preference.material,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', preference.user_id)
      .select()
      .single();
    
    return { data, error };
  } else {
    // Create new preference
    const { data, error } = await supabase
      .from('user_preferences')
      .insert([preference])
      .select()
      .single();
    
    return { data, error };
  }
};

export const getUserPreference = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

// Real-time subscriptions
export const subscribeToLeads = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('leads')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'leads',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToPreferences = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('preferences')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_preferences',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}; 