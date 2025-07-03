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
} 