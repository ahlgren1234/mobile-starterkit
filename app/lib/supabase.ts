import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
 * Konfigurerad för React Native med:
 * - Session-persistence för att behålla inloggning mellan app-starts
 * - Automatisk token-refresh
 * 
 * @returns Supabase-klient instans
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Aktivera session-persistence för React Native
    storage: {
      getItem: async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          console.log('Auth storage get:', key, value ? 'found' : 'not found');
          return value;
        } catch (error) {
          console.error('Error getting auth storage:', error);
          return null;
        }
      },
      setItem: async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
          console.log('Auth storage set:', key);
        } catch (error) {
          console.error('Error setting auth storage:', error);
        }
      },
      removeItem: async (key) => {
        try {
          await AsyncStorage.removeItem(key);
          console.log('Auth storage removed:', key);
        } catch (error) {
          console.error('Error removing auth storage:', error);
        }
      },
    },
    // Automatisk session-refresh
    autoRefreshToken: true,
    // Behåll session mellan app-starts
    persistSession: true,
    // Detektera session-ändringar
    detectSessionInUrl: false,
  },
});

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