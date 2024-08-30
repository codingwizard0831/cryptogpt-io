import { cookies } from 'next/headers'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createServerClient } from '@supabase/ssr'

import { SUPABASE_API } from 'src/config-global';

export function createCustomServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    SUPABASE_API.url!,
    SUPABASE_API.anonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            //
          }
        },
      },
    }
  )
}