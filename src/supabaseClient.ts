import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://nnlhkwupxkkpuhrbmool.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8OtXzBU8dLKcwBkddfiJ-w_7ShpuVnb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
