import { createClient } from '@supabase/supabase-js';

const adminUrl = import.meta.env.VITE_ADMIN_SUPABASE_URL;
const adminAnonKey = import.meta.env.VITE_ADMIN_SUPABASE_ANON_KEY;

if (!adminUrl || !adminAnonKey) {
  throw new Error('Missing admin Supabase environment variables');
}

export const supabaseAdmin = createClient(adminUrl, adminAnonKey);
