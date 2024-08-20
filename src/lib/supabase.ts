import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_API } from 'src/config-global';

export const supabase: SupabaseClient = createClient(SUPABASE_API.url, SUPABASE_API.anonKey)
export const supabaseServiceRole: SupabaseClient = createClient(SUPABASE_API.url, SUPABASE_API.serviceRoleKey)