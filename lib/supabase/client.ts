import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Deploy trigger: 2026-06-29T18:32:27.914Z
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
