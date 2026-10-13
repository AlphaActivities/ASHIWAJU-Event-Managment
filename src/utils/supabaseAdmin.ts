import { createClient } from '@supabase/supabase-js';

const adminUrl = import.meta.env.VITE_ADMIN_SUPABASE_URL;
const adminAnonKey = import.meta.env.VITE_ADMIN_SUPABASE_ANON_KEY;

export const adminConfigAvailable = Boolean(adminUrl && adminAnonKey);

export const supabaseAdmin = adminConfigAvailable
  ? createClient(adminUrl as string, adminAnonKey as string)
  : null;
