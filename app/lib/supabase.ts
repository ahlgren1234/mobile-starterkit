import { createClient } from '@supabase/supabase-js';

/**
 * Supabase-klient för autentisering och databasåtkomst
 * 
 * Denna klient används för:
 * - E-post/lösenord autentisering
 * - Användardata-hantering
 * - Databasoperationer
 * 
 * Credentials hämtas från environment variables:
 * - EXPO_PUBLIC_SUPABASE_URL
 * - EXPO_PUBLIC_SUPABASE_ANON_KEY
 * 
 * Se env.example för mall på hur du sätter upp .env-filen
 */
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validera att environment variables finns
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase credentials saknas. Skapa en .env-fil med EXPO_PUBLIC_SUPABASE_URL och EXPO_PUBLIC_SUPABASE_ANON_KEY. Se env.example för mall.'
  );
}

/**
 * Skapar och exporterar Supabase-klienten
 * 
 * @returns Supabase-klient instans
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Auth-typer för TypeScript
 */
export type AuthUser = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type AuthError = {
  message: string;
  status?: number;
}; 