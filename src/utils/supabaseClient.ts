// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserClient } from '@supabase/ssr'

import { SUPABASE_API } from 'src/config-global';

export const supabase = createBrowserClient(SUPABASE_API.url, SUPABASE_API.anonKey)
